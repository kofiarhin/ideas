# Indexed Inboxes

The indexed inboxes are the hot-path communication layer for Zoro and Architect.

## Structure

```text
inboxes/
├── zoro/
│   ├── open.json
│   ├── messages/
│   └── archive/<YYYY-MM>/
└── architect/
    ├── open.json
    ├── messages/
    └── archive/<YYYY-MM>/
```

`open.json` contains routing metadata only. Agents load one selected message file instead of downloading the complete mailbox history.

## Authority

- Zoro assignments and feedback flow through `inboxes/zoro/`.
- Zoro acknowledgements and reports flow through `inboxes/architect/`.
- Architect run task state remains authoritative.
- Messages and reports never grant authority beyond their recorded fields and never prove completion by themselves.

## Compatibility

`zoro-inbox.md`, `architect-inbox.md`, and `zoro/messages/` remain preserved as cold compatibility history. Indexed message files may reference them for full legacy detail.

## Updates

When a new message is created:

1. create one message file;
2. add one routing record to the applicable `open.json`;
3. preserve the stable message ID and work key;
4. move closed messages to `archive/<YYYY-MM>/` and remove them from the open index;
5. do not rewrite historical messages silently.
