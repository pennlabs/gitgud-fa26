#!/bin/bash

# Get the name of the current local branch
CURRENT_BRANCH=$(git branch --show-current)

echo "🚀 Preparing to force push local branch '$CURRENT_BRANCH' to remote 'main'..."

# Execute the force push using HEAD to target remote main
git push origin HEAD:main --force

if [ $? -eq 0 ]; then
    echo "✅ Successfully force pushed '$CURRENT_BRANCH' to remote 'main'."
else
    echo "❌ Force push failed. Check your network, remote configuration, or branch protections."
fi

