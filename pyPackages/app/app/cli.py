#!/usr/bin/env python3

import argparse
import json
import sys

import requests


def main() -> None:
  parser = argparse.ArgumentParser(description="CLI tool to interact with the API")
  parser.add_argument("--url", default="http://localhost:8000", help="Base URL of the API")
  parser.add_argument("--endpoint", default="/echo", help="API endpoint to call")
  parser.add_argument("--data", default="{}", help="JSON data to send to the endpoint")

  args = parser.parse_args()

  try:
    data = json.loads(args.data)
    response = requests.post(f"{args.url}{args.endpoint}", json=data)
    print(f"Status code: {response.status_code}")
    print(json.dumps(response.json(), indent=2))
  except requests.RequestException as e:
    print(f"Error making request: {e}", file=sys.stderr)
  except json.JSONDecodeError:
    print(f"Error: Invalid JSON data: {args.data}", file=sys.stderr)
  except Exception as e:
    print(f"Unexpected error: {e}", file=sys.stderr)


if __name__ == "__main__":
  main()
