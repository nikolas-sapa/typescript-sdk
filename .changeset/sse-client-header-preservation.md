---
'@modelcontextprotocol/client': patch
---

Preserve `Last-Event-ID` and custom headers from `eventSourceInit` and `fetch(url, init)` in `SSEClientTransport`, preventing header loss during SSE connections and re-connections.
