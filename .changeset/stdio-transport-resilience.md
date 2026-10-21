---
'@modelcontextprotocol/client': patch
'@modelcontextprotocol/server': patch
---

Stdio transport resilience improvements:
- client stdio: forward child process stderr error events to `onerror` and protect PassThrough pipe errors to prevent unhandled EventEmitter process crashes.
- client stdio: make `send()` robust against backpressure disconnects; reject with `NotConnected` when disconnected or `ConnectionClosed` when child process exits during drain.
- server stdio: keep `_onerror` attached after `close()` with swallow tag, matching `stdout` behavior to prevent uncaught exceptions from late stdin errors.
