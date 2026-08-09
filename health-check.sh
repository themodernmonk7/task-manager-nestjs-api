#!/bin/bash

URL="https://api-staging.elanifylabs.com/api/health"
MAX_ATTEMPTS=10
SLEEP_SECONDS=3

for attempt in $(seq 1 "$MAX_ATTEMPTS"); do
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
    if [ "$STATUS" -eq 200 ]; then
        echo "Health check passed: HTTP $STATUS"
        exit 0
    fi
    echo "Attempt $attempt/$MAX_ATTEMPTS failed (HTTP $STATUS), retrying in ${SLEEP_SECONDS}s..."
    sleep "$SLEEP_SECONDS"
done

echo "Health check failed after $MAX_ATTEMPTS attempts: HTTP $STATUS"
exit 1

