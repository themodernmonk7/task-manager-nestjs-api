#!/bin/bash

URL="https://api-staging.elanifylabs.com/api/health"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
if [ "$STATUS" -eq 200 ]; then
    echo "Health check passed: HTTP $STATUS"
    exit 0
else
    echo "Health check failed: HTTP $STATUS"
    exit 1
fi

