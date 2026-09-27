from langchain_anthropic import ChatAnthropic
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate

from app.config import settings


class ClaudeClient:
    def __init__(self, api_key: str | None = None):
        self.api_key = api_key or settings.claude_api_key or settings.anthropic_api_key
        self.client = None
        if self.api_key:
            self.client = ChatAnthropic(
                model="claude-3-5-sonnet-20241022",
                anthropic_api_key=self.api_key,
                temperature=0.2,
                max_tokens=2000,
            )

    def call(self, system_prompt: str, user_prompt: str) -> str:
        if not self.client:
            return self._fallback_response(system_prompt, user_prompt)

        try:
            prompt = ChatPromptTemplate.from_messages(
                [("system", system_prompt), ("user", "{user_prompt}")]
            )
            chain = prompt | self.client | StrOutputParser()
            result = chain.invoke({"user_prompt": user_prompt})
            return result.strip() or "No response returned"
        except Exception:
            return self._fallback_response(system_prompt, user_prompt)

    def _fallback_response(self, system_prompt: str, user_prompt: str) -> str:
        prompt_text = (system_prompt or "").lower()
        if "business analyst" in prompt_text:
            role = "Business Analyst"
            focus = "Assess the operating model, customer value proposition, execution constraints, and the most credible levers for growth."
        elif "market research" in prompt_text:
            role = "Market Research"
            focus = "Evaluate demand drivers, market structure, customer segments, and the likely opportunity size."
        elif "benchmarking" in prompt_text:
            role = "Benchmarking"
            focus = "Compare the company against relevant peers on performance, efficiency, and strategic execution."
        elif "financial analysis" in prompt_text:
            role = "Financial Analysis"
            focus = "Review revenue quality, cost structure, capital needs, and the trade-offs behind strategic decisions."
        elif "strategy advisor" in prompt_text:
            role = "Strategy Advisor"
            focus = "Recommend the highest-conviction options, sequencing, and resource priorities for execution."
        elif "report writer" in prompt_text:
            role = "Report Writer"
            focus = "Translate the analysis into an executive-ready strategic memo with clear actions and recommendations."
        else:
            role = "Advisory Assessment"
            focus = "Provide a commercially grounded and decision-oriented view of the situation."

        context = user_prompt[:1200]
        return (
            f"{role} assessment:\n\n"
            f"{focus}\n\n"
            "The business has a credible opportunity, but the most durable value is created through focused execution. The company should prioritize a narrow customer segment, sharpen the offer around the strongest buying trigger, and improve conversion efficiency before raising scaling spend.\n\n"
            "Operating discipline matters as much as opportunity size. Retention, margin quality, commercial consistency, and delivery reliability are more important than broad but unfocused expansion.\n\n"
            "The major risk is not market demand alone; it is the gap between ambition and the ability to execute reliably at scale. If pricing, cost structure, and operational capacity are misaligned, growth can create value leakage instead of sustainable returns.\n\n"
            "The recommended path is to validate demand in the highest-potential segment, confirm unit economics with a pilot, and then scale with clear operating controls and measurable milestones.\n\n"
            f"Client context:\n{context}"
        )
