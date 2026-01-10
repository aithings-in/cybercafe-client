#!/bin/bash
# Script to remove secrets from git history

if [ -f "server/src/services/googleDriveService.ts" ]; then
  sed -i 's/901508933590-6g0bi6vs2p8l6d9qs294f5b5ikr2cdda\.apps\.googleusercontent\.com/YOUR_CLIENT_ID_HERE/g' server/src/services/googleDriveService.ts
  sed -i 's/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/YOUR_CLIENT_SECRET_HERE/g' server/src/services/googleDriveService.ts
  sed -i 's/4\/0ATX87lOWnPQ1h_5Rzb662hCok3XZm6ler4DfKxxRgD7bBJ4BCU3R2env6KMxQSvXPAdfHA/YOUR_REFRESH_TOKEN_HERE/g' server/src/services/googleDriveService.ts
fi

if [ -f "server/src/scripts/getOAuth2Token.ts" ]; then
  sed -i 's/901508933590-6g0bi6vs2p8l6d9qs294f5b5ikr2cdda\.apps\.googleusercontent\.com/YOUR_CLIENT_ID_HERE/g' server/src/scripts/getOAuth2Token.ts
  sed -i 's/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/YOUR_CLIENT_SECRET_HERE/g' server/src/scripts/getOAuth2Token.ts
fi

