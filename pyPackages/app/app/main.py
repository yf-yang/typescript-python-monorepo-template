import json
from collections.abc import AsyncGenerator
from typing import Any, TypedDict

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


@app.post("/echo_payload")
async def echo(payload: dict[Any, Any]) -> dict:
  return {
    "payload": payload,
  }


@app.post("/echo_request")
async def echo_request(request: Request) -> dict:
  return {
    "request.json()": await request.json(),
  }

class Sample(TypedDict):
  name: str
  age: int


@app.post("/sample")
async def sample(sample: Sample) -> dict:
  return {
    "sample": sample,
  }

@app.get("/test")
async def test() -> dict:
  return "connected"
