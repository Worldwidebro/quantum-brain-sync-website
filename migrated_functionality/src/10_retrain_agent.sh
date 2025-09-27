#!/bin/bash
gemini "Collect /data/glass-examples/*.png → generate LoRA dataset → output YAML { agent, dataset, epochs }" | warp run retrain.sh
