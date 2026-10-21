---
'@modelcontextprotocol/client': patch
'@modelcontextprotocol/server': patch
---

Export missing public API types:
- `@modelcontextprotocol/client`: export `UnauthorizedContext` from root entry.
- `@modelcontextprotocol/server`: export `LegacyToolCallback`, `LegacyPromptCallback`, `CacheableResultMethod`, and `isCacheableResultMethod` from root entry.
