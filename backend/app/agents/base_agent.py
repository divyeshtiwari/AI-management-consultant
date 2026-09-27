from __future__ import annotations

from app.services.claude_client import ClaudeClient


class BaseAgent:
    name: str = "Base Agent"
    system_prompt: str = "You are a consultant agent."

    def __init__(self, client: ClaudeClient | None = None):
        self.client = client or ClaudeClient()

    def run(self, context: str) -> str:
        return self.client.call(self.system_prompt, context)
