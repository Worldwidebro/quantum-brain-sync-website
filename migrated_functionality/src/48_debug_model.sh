#!/bin/bash
gemini "Suggest: reduce max_tokens to 2048, add --max-input-length 1024 → output YAML" | warp apply -f -
