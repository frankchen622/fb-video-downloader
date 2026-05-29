#!/bin/bash
# Auto-submit all pages to IndexNow after deployment

DOMAIN="https://dlfb.io"
API_ENDPOINT="${DOMAIN}/api/indexnow"

# All pages to submit
PAGES=(
  "/"
  "/reels-downloader"
  "/facebook-to-mp3"
  "/facebook-to-mp4"
  "/private-video-downloader"
  "/contact"
  "/privacy-policy"
  "/terms-of-use"
)

# Build URL list
URLS=()
for page in "${PAGES[@]}"; do
  URLS+=("${DOMAIN}${page}")
done

# Convert to JSON array
JSON_URLS=$(printf '%s\n' "${URLS[@]}" | jq -R . | jq -s .)

# Submit to IndexNow
echo "Submitting ${#URLS[@]} URLs to IndexNow..."
curl -X POST "${API_ENDPOINT}" \
  -H "Content-Type: application/json" \
  -d "{\"urls\": ${JSON_URLS}}"

echo ""
echo "Done!"
