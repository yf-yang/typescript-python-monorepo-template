import json
from pathlib import Path

from app.main import app


def get_openapi_schema(output_file: Path = None) -> dict:
  """
  Generate OpenAPI schema from the FastAPI application.

  Args:
      output_file: Optional path to save the schema to a JSON file

  Returns:
      The OpenAPI schema as a dictionary
  """
  openapi_schema = app.openapi()

  if output_file:
    with open(output_file, "w") as f:
      json.dump(openapi_schema, f, indent=2)

  return openapi_schema


def main() -> None:
  """Main function that generates the OpenAPI schema and writes it to the pyPackages/app/ folder."""
  output_path = Path(__file__).parent.parent / "openapi.json"
  # Create directory if it doesn't exist
  output_path.parent.mkdir(parents=True, exist_ok=True)

  _ = get_openapi_schema(output_path)
  print(f"OpenAPI schema saved to {output_path.absolute()}")
