from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field


class AnalyzeRequest(BaseModel):
    company_name: str = Field(..., min_length=2)
    industry: str = Field(..., min_length=2)
    market: str = Field(default="")
    business_context: str = Field(..., min_length=10)
    objective: str = Field(..., min_length=10)
    constraints: List[str] = Field(default_factory=list)


class AnalyzeResponse(BaseModel):
    report_id: str
    status: str
    message: str


class ReportDetail(BaseModel):
    id: str
    company_name: str
    industry: str
    market: str
    objective: str
    executive_summary: str
    market_overview: str
    benchmarking: str
    financial_analysis: str
    strategy: str
    recommendations: str
    markdown: str = ""
    report_data: Dict[str, Any]
    status: str
    created_at: str
