import json
from typing import Any, Dict, List

from app.agents.benchmarking import BenchmarkingAgent
from app.agents.business_analyst import BusinessAnalystAgent
from app.agents.financial_analysis import FinancialAnalysisAgent
from app.agents.market_research import MarketResearchAgent
from app.agents.report_writer import ReportWriterAgent
from app.agents.strategy_advisor import StrategyAdvisorAgent
from app.services.claude_client import ClaudeClient


class ConsultingPipeline:
    def __init__(self, client: ClaudeClient | None = None):
        self.client = client or ClaudeClient()
        self.agents = [
            BusinessAnalystAgent(self.client),
            MarketResearchAgent(self.client),
            BenchmarkingAgent(self.client),
            FinancialAnalysisAgent(self.client),
            StrategyAdvisorAgent(self.client),
            ReportWriterAgent(self.client),
        ]

    def run(self, payload: Dict[str, Any], on_progress=None):
        context = self._build_context(payload)
        section_outputs: Dict[str, str] = {}

        for agent in self.agents:
            if on_progress:
                on_progress({"agent": agent.name, "status": "in_progress"})

            result = agent.run(context)
            section_outputs[agent.name.lower().replace(" ", "_")] = result
            context = self._merge_context(context, agent.name, result)

            if on_progress:
                on_progress(
                    {"agent": agent.name, "status": "completed", "output": result[:300]}
                )

        report_json = self._parse_report(section_outputs)
        return report_json

    def _build_context(self, payload: Dict[str, Any]) -> str:
        constraints = payload.get("constraints", [])
        constraints_text = (
            "\n".join(f"- {item}" for item in constraints)
            if constraints
            else "- None stated"
        )
        return (
            "Company profile:\n"
            f"Company: {payload.get('company_name', '')}\n"
            f"Industry: {payload.get('industry', '')}\n"
            f"Market: {payload.get('market', '')}\n"
            f"Business context: {payload.get('business_context', '')}\n"
            f"Objective: {payload.get('objective', '')}\n"
            f"Constraints:\n{constraints_text}\n\n"
            "Please produce a detailed strategic management consulting assessment."
        )

    def _merge_context(self, context: str, name: str, result: str) -> str:
        return context + f"\n\n### {name} Analysis\n{result[:2000]}"

    def _parse_report(self, section_outputs: Dict[str, str]) -> Dict[str, str]:
        report_json_text = section_outputs.get("report_writer", "")
        try:
            cleaned = report_json_text.strip()
            if cleaned.startswith("```"):
                cleaned = cleaned.replace("```json", "").replace("```", "").strip()
            parsed = json.loads(cleaned)
            for key in [
                "executive_summary",
                "market_overview",
                "benchmarking",
                "financial_analysis",
                "strategy",
                "recommendations",
            ]:
                parsed.setdefault(key, "")
            return parsed
        except Exception:
            return {
                "executive_summary": section_outputs.get("business_analyst", ""),
                "market_overview": section_outputs.get("market_research", ""),
                "benchmarking": section_outputs.get("benchmarking", ""),
                "financial_analysis": section_outputs.get("financial_analysis", ""),
                "strategy": section_outputs.get("strategy_advisor", ""),
                "recommendations": "1. Prioritize the highest-impact initiatives.\n2. Measure impact on revenue, margin, and market position.\n3. Maintain disciplined execution and regular review.",
            }
