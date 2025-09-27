#!/bin/bash
gemini "Analyze logs at /agents/migration.log → find error → suggest fix → output JSON { error, fix, agent }" | pbcopy
