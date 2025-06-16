import json
from pathlib import Path

from pydantic import BaseModel

from app.main import app

pydantic_models: list[type[BaseModel]] = []


def main() -> None:
  """Main function that generates the OpenAPI schema and writes it to the pyPackages/app/ folder."""
  output_dir = Path(__file__).parent.parent
  openapi_path = output_dir / "openapi.json"

  openapi_schema = app.openapi()
  with open(openapi_path, "w") as f:
    json.dump(openapi_schema, f, indent=2)

  print(f"OpenAPI schema saved to {openapi_path.absolute()}")

  combined_schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "title": "_Schema",
    "properties": {model.__name__: model.model_json_schema() for model in pydantic_models},
  }

  schema_path = output_dir / "schema.json"

  with open(schema_path, "w") as f:
    json.dump(combined_schema, f, indent=2)

  print(f"{len(pydantic_models)} json schema saved to {schema_path.absolute()}")
