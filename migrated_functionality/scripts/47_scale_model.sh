#!/bin/bash
gemini "Update docker-compose.yaml: replicas: 3 → output YAML" | warp apply -f -
