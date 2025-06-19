import json
from pathlib import Path

from inflection import camelize, underscore
from pydantic import BaseModel

from app.main import app


class _Schema(BaseModel):
  """
  This is a dummy class to export classes to the frontend.
  To export keys, declare as dummy_key's union type.
  """

  # Replace with the keys you want to export.
  dummy_key: str | int


def main() -> None:
  """Main function that generates the OpenAPI schema and writes it to the pyPackages/app/ folder."""
  output_dir = Path(__file__).parent.parent
  openapi_path = output_dir / "openapi.json"

  openapi_schema = app.openapi()
  with open(openapi_path, "w") as f:
    json.dump(openapi_schema, f, indent=2)

  print(f"OpenAPI schema saved to {openapi_path.absolute()}")

  json_schema = _Schema.model_json_schema()
  # Deal with enums
  for schema in json_schema.get("$defs", {}).values():
    if "enum" not in schema:
      continue
    enum_values = schema["enum"]
    schema["tsEnumNames"] = [camelize(underscore(value)) for value in enum_values]

  schema_path = output_dir / "schema.json"

  with open(schema_path, "w") as f:
    json.dump(json_schema, f, indent=2)

  print(f"{len(json_schema['properties'])} json schema saved to {schema_path.absolute()}")
