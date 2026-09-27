# AI Management Consultant

A full-stack strategic advisory application built with FastAPI, React + Vite, Tailwind CSS, SQLite, and a six-step AI consulting workflow powered by Claude via LangChain.

## Stack

- Backend: FastAPI, SQLAlchemy, SQLite
- Frontend: React, Vite, Tailwind CSS
- AI orchestration: LangChain + Claude API
- Reporting: PDF export via ReportLab

## Environment setup

Create a local .env file in the project root from the example file:

```bash
cp .env.example .env
```

Then add your Claude key:

```env
CLAUDE_API_KEY=your_claude_api_key_here
```

## Backend setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

On macOS/Linux use:

```bash
source .venv/bin/activate
```

## Frontend setup

```bash
cd frontend
npm install
npm run dev -- --host 0.0.0.0 --port 5173
```

## Run both services

Open two terminals.

Terminal 1:

```bash
cd c:/Users/Dell/Downloads/platform/backend
.venv\Scripts\python.exe -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

Terminal 2:

```bash
cd c:/Users/Dell/Downloads/platform/frontend
npm run dev -- --host 0.0.0.0 --port 5173
```

## API routes

- POST /api/analyze
- GET /api/report/{id}
- GET /api/report/{id}/pdf

## Default local URLs

- Frontend: http://localhost:5173
- Backend: http://localhost:8000

The backend includes a fallback advisory engine when no Claude key is configured, so the application still runs locally without breaking the workflow.
