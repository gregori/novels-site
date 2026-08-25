When the user invokes AI-DLC, read and follow
`.aidlc/aidlc-rules/aws-aidlc-rules/core-workflow.md` to start the workflow.

## Translation conventions

These rules apply to all translated chapter content under `src/content/titles/`.

### Chapter front matter

Every chapter file needs this front matter:

```md
---
chapterTitle: "Chapter NN: <Title>"
publishDate: YYYY-MM-DD
volume: N
---
```

- `chapterTitle` — the full display title. Must start with `Chapter NN: ` (zero-padded, continuous numbering, never resets per volume).
- `volume` — the work's grouping unit (`章`). Optional; always set it when present in the source. Arc/volume 1 = chapters 1–12, volume 2 = chapters 13–26, etc.
- `chapterTitle` is a single string; do not fold the volume number into it.

### Typography

- **Dialogue** (spoken lines in quotation marks) — plain text, **no bold**.
- **Internal monologue / thoughts** (typically lines starting with an em dash `—`) — *italic* (`_..._`). Use underscores, not asterisks.
- **Character reveal card** (a standalone name like `'Tachibana Matsurika'`) — **bold** (`**...**`), on its own paragraph.
- **Emphasis** — use bold only for rare, intentional emphasis (e.g. a shouted line in a phone call), never for regular dialogue.
- Translator's notes (`T/N`, `TN`) keep their existing **bold** marker.
- Chapter headers like `**Chapter NN: <Title>**` may repeat as a bold first line, but the `<h1>` is driven by `chapterTitle`.

### Naming and ordering

- Chapter files: `chapter-NN.md` (zero-padded, continuous, never reset per volume). Ordering is lexicographic by filename.
- Keep names in Japanese order (surname first name), honorifics, and family vocatives as in the source.

### Status in `index.md`

- The title's `status` field reflects translation progress (`ongoing`, `completed`, `paused`, `dropped`), not the source work's own status.

