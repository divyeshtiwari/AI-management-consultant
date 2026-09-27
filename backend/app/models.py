import json
import uuid
from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, String, Text
from sqlalchemy.orm import relationship

from app.database import Base


class Session(Base):
    __tablename__ = "sessions"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    company_name = Column(String, nullable=False)
    industry = Column(String, nullable=False)
    market = Column(String, default="")
    business_context = Column(Text, nullable=False)
    objective = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    status = Column(String, default="pending")
    progress = Column(Text, default="[]")
    report_id = Column(String, nullable=True)

    report = relationship("Report", back_populates="session", uselist=False)

    def set_progress(self, value):
        self.progress = json.dumps(value)

    def get_progress(self):
        try:
            return json.loads(self.progress or "[]")
        except json.JSONDecodeError:
            return []


class Report(Base):
    __tablename__ = "reports"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id = Column(String, ForeignKey("sessions.id"), nullable=False, unique=True)
    company_name = Column(String, nullable=False)
    industry = Column(String, nullable=False)
    market = Column(String, default="")
    objective = Column(Text, nullable=False)
    executive_summary = Column(Text, default="")
    market_overview = Column(Text, default="")
    benchmarking = Column(Text, default="")
    financial_analysis = Column(Text, default="")
    strategy = Column(Text, default="")
    recommendations = Column(Text, default="")
    report_data = Column(Text, default="{}")
    pdf_path = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    status = Column(String, default="completed")

    session = relationship("Session", back_populates="report")

    def set_report_data(self, value):
        self.report_data = json.dumps(value)

    def get_report_data(self):
        try:
            return json.loads(self.report_data or "{}")
        except json.JSONDecodeError:
            return {}
