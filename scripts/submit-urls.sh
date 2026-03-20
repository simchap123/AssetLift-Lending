#!/usr/bin/env bash
#
# submit-urls.sh - Submit AssetLift Lending sitemap and URLs to search engines
#
# Usage: ./scripts/submit-urls.sh
# Run this script anytime new content is added to notify search engines.

set -euo pipefail

SITE="https://www.assetliftlending.com"
SITEMAP_URL="${SITE}/sitemap.xml"
INDEXNOW_KEY="a1b2c3d4e5f6g7h8"
INDEXNOW_KEY_LOCATION="${SITE}/${INDEXNOW_KEY}.txt"

# Key pages to submit for indexing
URLS=(
  "${SITE}/"
  "${SITE}/apply"
  "${SITE}/about"
  "${SITE}/how-it-works"
  "${SITE}/contact"
  "${SITE}/faq"
  "${SITE}/markets"
  "${SITE}/blog"
  "${SITE}/loans/fix-and-flip"
  "${SITE}/loans/dscr-rental"
  "${SITE}/loans/bridge"
  "${SITE}/loans/ground-up-construction"
  "${SITE}/tools/fix-and-flip-calculator"
  "${SITE}/tools/dscr-calculator"
  "${SITE}/team"
  "${SITE}/privacy"
)

echo "============================================"
echo " AssetLift Lending - Search Engine Submission"
echo "============================================"
echo ""

# -----------------------------------------------
# 1. Ping search engines with sitemap
# -----------------------------------------------
echo "--- Sitemap Pings ---"

GOOGLE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://www.google.com/ping?sitemap=${SITEMAP_URL}" || true)
echo "Google sitemap ping: HTTP ${GOOGLE_STATUS} (Note: Google deprecated this endpoint; use Search Console)"

BING_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://www.bing.com/ping?sitemap=${SITEMAP_URL}" || true)
echo "Bing sitemap ping:   HTTP ${BING_STATUS} (Note: Bing now prefers IndexNow)"

echo ""

# -----------------------------------------------
# 2. Submit URLs to IndexNow (Bing, Yandex, etc.)
# -----------------------------------------------
echo "--- IndexNow Submission ---"

# Build JSON URL list
URL_JSON=""
for url in "${URLS[@]}"; do
  if [ -n "$URL_JSON" ]; then
    URL_JSON="${URL_JSON},"
  fi
  URL_JSON="${URL_JSON}\"${url}\""
done

PAYLOAD=$(cat <<EOF
{
  "host": "www.assetliftlending.com",
  "key": "${INDEXNOW_KEY}",
  "keyLocation": "${INDEXNOW_KEY_LOCATION}",
  "urlList": [${URL_JSON}]
}
EOF
)

INDEXNOW_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "${PAYLOAD}")

INDEXNOW_STATUS=$(echo "$INDEXNOW_RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
INDEXNOW_BODY=$(echo "$INDEXNOW_RESPONSE" | grep -v "HTTP_STATUS" || true)

echo "IndexNow API response: HTTP ${INDEXNOW_STATUS}"
if [ -n "$INDEXNOW_BODY" ]; then
  echo "Response body: ${INDEXNOW_BODY}"
fi

case "$INDEXNOW_STATUS" in
  200) echo "Status: OK - URLs submitted successfully" ;;
  202) echo "Status: Accepted - URLs accepted for processing" ;;
  400) echo "Status: Bad Request - check payload format" ;;
  403) echo "Status: Forbidden - key validation failed" ;;
  422) echo "Status: Unprocessable - URLs don't match host" ;;
  429) echo "Status: Too Many Requests - rate limited, try later" ;;
  *)   echo "Status: Unexpected response code" ;;
esac

echo ""

# -----------------------------------------------
# 3. Summary
# -----------------------------------------------
echo "--- Summary ---"
echo "Sitemap URL:     ${SITEMAP_URL}"
echo "URLs submitted:  ${#URLS[@]}"
echo "IndexNow key:    ${INDEXNOW_KEY}"
echo ""
echo "Recommended next steps:"
echo "  - Verify sitemap in Google Search Console"
echo "  - Verify sitemap in Bing Webmaster Tools"
echo "  - Monitor indexing status over the next few days"
echo ""
echo "Done."
