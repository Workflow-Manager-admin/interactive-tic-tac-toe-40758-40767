#!/bin/bash
cd /home/kavia/workspace/code-generation/interactive-tic-tac-toe-40758-40767/tic_tac_toe_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

