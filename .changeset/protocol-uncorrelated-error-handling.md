---
'@modelcontextprotocol/core-internal': patch
---

Route un-correlated JSON-RPC error responses (with omitted or null id) directly to `onerror` as `ProtocolError`, preventing false hijacking of in-flight request 0. Also guard against missing `progressToken` in progress notifications.
