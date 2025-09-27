#!/bin/bash
gemini "Run 1000 requests → measure latency, tokens/sec, $/task → output CSV model,latency,throughput,cost" | warp table
