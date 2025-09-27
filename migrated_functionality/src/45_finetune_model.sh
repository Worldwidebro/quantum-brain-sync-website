#!/bin/bash
gemini "Generate LoRA dataset → train for 1 epoch → output YAML { model, dataset, epochs, output_dir }" | warp run finetune.sh
