import json
from collections.abc import AsyncGenerator

import dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

dotenv.load_dotenv()

app = FastAPI()

# Configure CORS
app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)


@app.post("/echo")
async def echo(request: Request) -> dict:
  return {
    "request.json()": await request.json(),
  }
