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


@app.post("/echo")
async def echo(request: dict[Any, Any]) -> dict:
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
