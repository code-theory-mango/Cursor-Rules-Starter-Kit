#!/bin/bash
# Ralph Loop Template
# Autonomous agent loop with fresh context and external verification
#
# Usage:
#   1. Copy this template for your specific task
#   2. Customize VERIFICATION_CMD and PROMPT
#   3. Run: ./scripts/ralph-loop.sh
#
# Reference: https://forum.cursor.com/t/ralph-cursor-guide/149998

set -e

# Configuration
MAX_ITERATIONS=${MAX_ITERATIONS:-50}
MODEL=${MODEL:-""}  # Empty uses default, or specify: --model grok
ITERATION=0

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# ============================================
# CUSTOMIZE THESE FOR YOUR TASK
# ============================================

# Pattern to search for (when count reaches 0, task is done)
SEARCH_PATTERN="TODO_PATTERN_HERE"
SEARCH_PATH="src/"

# Additional verification (e.g., type checking, tests)
# Return 0 for success, non-zero for failure
additional_verification() {
  # Uncomment the checks you need:
  # npx tsc --noEmit || return 1
  # npm test || return 1
  # npm run lint || return 1
  # npm run build || return 1
  return 0
}

# The prompt for each fresh agent iteration
# Keep it atomic: ONE file, ONE change
PROMPT='[CUSTOMIZE THIS PROMPT]

Find ONE file that needs migration:
  grep -r "OLD_PATTERN" src/ -l | head -1

Transformation:
- OLD: import OldThing from "old-path"  
- NEW: import { newThing } from "new-path"

Instructions:
1. Find ONE file still using the old pattern
2. Read it to understand context  
3. Apply the transformation
4. Run type check: npx tsc --noEmit
5. Stop after ONE file - do not continue to other files'

# ============================================
# LOOP LOGIC (usually no changes needed)
# ============================================

# Check if Cursor CLI is available
if ! command -v agent &> /dev/null; then
  echo -e "${RED}Error: Cursor CLI 'agent' not found${NC}"
  echo "Install with: curl -fsSL https://www.cursor.com/install.sh | sh"
  exit 1
fi

# Load environment if exists
[ -f .env ] && source .env

# Verification function
verify_done() {
  local remaining
  remaining=$(grep -r "$SEARCH_PATTERN" "$SEARCH_PATH" 2>/dev/null | wc -l | tr -d ' ')
  
  if [ "$remaining" -eq 0 ]; then
    echo -e "${YELLOW}Pattern count: 0, running additional verification...${NC}"
    if additional_verification; then
      return 0
    else
      echo -e "${YELLOW}Additional verification failed, continuing...${NC}"
      return 1
    fi
  fi
  
  echo -e "${YELLOW}Remaining matches: $remaining${NC}"
  return 1
}

# Build agent command
build_agent_cmd() {
  local cmd="agent -p"
  [ -n "$MODEL" ] && cmd="$cmd --model $MODEL"
  echo "$cmd"
}

# Main loop
echo "============================================"
echo "Ralph Loop Starting"
echo "Pattern: $SEARCH_PATTERN"
echo "Path: $SEARCH_PATH"
echo "Max iterations: $MAX_ITERATIONS"
echo "============================================"

while [ $ITERATION -lt $MAX_ITERATIONS ]; do
  echo ""
  echo -e "${GREEN}=== Iteration $ITERATION ===${NC}"
  
  if verify_done; then
    echo ""
    echo -e "${GREEN}✓ SUCCESS: Task complete after $ITERATION iterations${NC}"
    exit 0
  fi
  
  # Run fresh agent with the prompt
  AGENT_CMD=$(build_agent_cmd)
  echo "Running: $AGENT_CMD \"...\""
  $AGENT_CMD "$PROMPT"
  
  ITERATION=$((ITERATION + 1))
  
  # Optional: small delay between iterations
  # sleep 2
done

echo ""
echo -e "${RED}✗ FAILED: Reached max iterations ($MAX_ITERATIONS)${NC}"
exit 1
