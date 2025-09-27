#!/bin/bash
gemini "Generate Docker Compose: service: mixtral, image: ghcr.io/huggingface/text-generation-inference, ports: 8080:80 → output YAML" | warp save docker-compose.yaml
