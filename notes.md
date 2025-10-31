### Database Choice
I choose SQLite (better-sqlite3) because its lightweight, fast, and file-based, perfect for small full-stack apps without requiring a separate DB server.

---

### Schema Definition
The `tasks` table includes:
- `id` – Primary key (auto-increment)
- `title`, `description` – Core task details
- `priority` – Enum-like constraint (`Low`, `Medium`, `High`)
- `due_date` – ISO date string for filtering/sorting
- `status` – Enum-like (`Open`, `In Progress`, `Done`) with default `'Open'`
- `created_at` – Timestamp for record tracking

This schema ensures clean validation and supports filtering, sorting, and aggregation efficiently.

---

### Smart Insights Logic
The **/insights** API performs simple rule-based analysis:
- Counts open, done, and due-soon tasks.
- Highlights trends (e.g., many high-priority tasks or tasks due within 3 days).
- Generates a natural summary string (e.g., _“Most of your open tasks are High priority and a few are due soon.”_)

It mimics a lightweight “AI insight” without using any ML model — purely based on conditional logic.

---
