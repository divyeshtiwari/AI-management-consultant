import json
import os
from datetime import datetime
from typing import Any, Dict, Generator

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, StreamingResponse
from sqlalchemy.orm import Session

from app.config import settings
from app.database import SessionLocal, init_db
from app.models import Report, Session as SessionModel
from app.pipeline import ConsultingPipeline
from app.schemas import AnalyzeRequest, ReportDetail

app = FastAPI(title="AI Management Consultant")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.frontend_origin,
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/api/analyze")
def analyze(request: AnalyzeRequest):
    db = SessionLocal()
    session = SessionModel(
        company_name=request.company_name,
        industry=request.industry,
        market=request.market,
        business_context=request.business_context,
        objective=request.objective,
        status="processing",
    )
    db.add(session)
    db.commit()
    db.refresh(session)
    db.close()

    def stream_progress() -> Generator[str, None, None]:
        try:
            pipeline = ConsultingPipeline()
            payload = {
                "company_name": request.company_name,
                "industry": request.industry,
                "market": request.market,
                "business_context": request.business_context,
                "objective": request.objective,
                "constraints": request.constraints,
            }
            progress = []
            context = pipeline._build_context(payload)
            section_outputs = {}

            for agent in pipeline.agents:
                progress.append({"agent": agent.name, "status": "in_progress"})
                yield f"data: {json.dumps({'agent': agent.name, 'status': 'in_progress', 'progress': progress})}\n\n"

                result = agent.run(context)
                section_outputs[agent.name.lower().replace(" ", "_")] = result
                context = pipeline._merge_context(context, agent.name, result)

                for item in progress:
                    if item["agent"] == agent.name:
                        item["status"] = "completed"
                        break

                db2 = SessionLocal()
                stored = (
                    db2.query(SessionModel)
                    .filter(SessionModel.id == session.id)
                    .first()
                )
                if stored:
                    stored.set_progress(progress)
                    stored.status = "processing"
                    db2.commit()
                db2.close()

                yield f"data: {json.dumps({'agent': agent.name, 'status': 'completed', 'progress': progress, 'output_preview': result[:250]})}\n\n"

            report = pipeline._parse_report(section_outputs)
            report_record = Report(
                session_id=session.id,
                company_name=request.company_name,
                industry=request.industry,
                market=request.market,
                objective=request.objective,
                executive_summary=str(report.get("executive_summary", "")),
                market_overview=str(report.get("market_overview", "")),
                benchmarking=str(report.get("benchmarking", "")),
                financial_analysis=str(report.get("financial_analysis", "")),
                strategy=str(report.get("strategy", "")),
                recommendations=str(report.get("recommendations", "")),
                report_data=json.dumps(report),
                status="completed",
            )

            db3 = SessionLocal()
            db3.add(report_record)
            session_model = (
                db3.query(SessionModel).filter(SessionModel.id == session.id).first()
            )
            if session_model:
                session_model.report_id = report_record.id
                session_model.status = "completed"
                session_model.set_progress(progress)
            db3.commit()
            db3.refresh(report_record)
            db3.close()

            yield f"data: {json.dumps({'event': 'done', 'report_id': report_record.id, 'status': 'completed'})}\n\n"
        except Exception as exc:
            db4 = SessionLocal()
            stored = (
                db4.query(SessionModel).filter(SessionModel.id == session.id).first()
            )
            if stored:
                stored.status = "failed"
                db4.commit()
            db4.close()
            yield f"data: {json.dumps({'event': 'error', 'message': str(exc)})}\n\n"

    response = StreamingResponse(stream_progress(), media_type="text/event-stream")
    response.headers["Cache-Control"] = "no-cache"
    response.headers["Connection"] = "keep-alive"
    return response


@app.get("/api/report/{report_id}", response_model=ReportDetail)
def get_report(report_id: str, db: Session = Depends(get_db)):
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    return ReportDetail(
        id=report.id,
        company_name=report.company_name,
        industry=report.industry,
        market=report.market,
        objective=report.objective,
        executive_summary=report.executive_summary,
        market_overview=report.market_overview,
        benchmarking=report.benchmarking,
        financial_analysis=report.financial_analysis,
        strategy=report.strategy,
        recommendations=report.recommendations,
        report_data=report.get_report_data(),
        status=report.status,
        created_at=report.created_at.isoformat(),
    )


@app.get("/api/report/{report_id}/pdf")
def export_report_pdf(report_id: str, db: Session = Depends(get_db)):
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    os.makedirs("exports", exist_ok=True)
    pdf_path = os.path.join("exports", f"{report.id}.pdf")

    from reportlab.lib.colors import HexColor
    from reportlab.lib.pagesizes import letter
    from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
    from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer

    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        rightMargin=54,
        leftMargin=54,
        topMargin=52,
        bottomMargin=52,
    )
    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        "CustomTitle",
        parent=styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=24,
        leading=28,
        textColor=HexColor("#1d2430"),
        spaceAfter=8,
    )
    subtitle_style = ParagraphStyle(
        "CustomSubtitle",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=12,
        leading=16,
        textColor=HexColor("#4b5563"),
        spaceAfter=18,
    )
    section_style = ParagraphStyle(
        "CustomSection",
        parent=styles["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=14,
        leading=18,
        textColor=HexColor("#ea580c"),
        spaceBefore=10,
        spaceAfter=8,
    )
    body_style = ParagraphStyle(
        "CustomBody",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=10,
        leading=15,
        textColor=HexColor("#2f3745"),
        alignment=1,
    )
    meta_style = ParagraphStyle(
        "MetaText",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=9,
        leading=12,
        textColor=HexColor("#667085"),
        spaceAfter=14,
    )

    story = []
    story.append(Paragraph(report.company_name, title_style))
    story.append(Paragraph(f"{report.industry} • {report.market}", subtitle_style))
    story.append(
        Paragraph(
            f"Prepared for: {report.objective or 'Strategic planning engagement'}",
            meta_style,
        )
    )
    story.append(Spacer(1, 8))

    for title, content in [
        ("Executive Summary", report.executive_summary),
        ("Market Overview", report.market_overview),
        ("Benchmarking", report.benchmarking),
        ("Financial Analysis", report.financial_analysis),
        ("Strategy", report.strategy),
        ("Recommendations", report.recommendations),
    ]:
        story.append(Paragraph(title, section_style))
        story.append(Paragraph(content or "No data available.", body_style))
        story.append(Spacer(1, 10))

    doc.build(story)
    report.pdf_path = pdf_path
    db.commit()
    return FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename=f"{report.company_name.lower().replace(' ', '_')}.pdf",
    )
