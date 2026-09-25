# AFTER HOURS

CoinMarketCap API app. RWA track. Not WRAPPER.

Cash session clock + CMC RWA list/quotes + OHLCV chart when a linked crypto id exists.

## Env
CMC_API_KEY on Vercel (server only). Never put it in VITE_.

## Endpoints
- /v5/real-world-assets/assets/list
- /v5/real-world-assets/quotes/latest
- /v5/real-world-assets/issuers/list
- /v2/cryptocurrency/ohlcv/historical
