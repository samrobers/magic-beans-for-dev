/*
# Create docs_pages table for the Help Corral

1. New Tables
- `docs_pages`
  - `id` (uuid, primary key, auto-generated)
  - `title` (text, not null) - page title
  - `category` (text, not null, default 'General') - grouping label shown in the page list
  - `content` (text, not null, default '') - page body, markdown-style plain text
  - `sort_order` (integer, not null, default 0) - manual ordering within a category
  - `created_at` (timestamp with time zone, default now())
  - `updated_at` (timestamp with time zone, default now())

2. Seed Data
- Three placeholder pages inserted once (guarded by title lookup) so the
  section is not empty on first visit:
  - "Meet the Corral" (General) - explains what this section is for
  - "Development Notes" (Development) - placeholder for dev docs
  - "Snippets & Shortcuts" (Development) - placeholder for code notes

3. Security
- Enable RLS on `docs_pages`.
- Grant SELECT, INSERT, UPDATE, DELETE to `anon` and `authenticated`.
- Four separate policies (select/insert/update/delete) allowing all access
  `TO anon, authenticated` because this is a single-tenant, no-sign-in app
  and the content is intentionally shared.

4. Important Notes
- Idempotent: safe to re-run (IF NOT EXISTS / DROP POLICY IF EXISTS).
- Seed inserts reference rows by title so duplicates are never created.
- `updated_at` is refreshed automatically by a trigger.
*/

CREATE TABLE IF NOT EXISTS docs_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'General',
  content text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE docs_pages ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON docs_pages TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_docs_pages" ON docs_pages;
CREATE POLICY "anon_select_docs_pages" ON docs_pages
FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_docs_pages" ON docs_pages;
CREATE POLICY "anon_insert_docs_pages" ON docs_pages
FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_docs_pages" ON docs_pages;
CREATE POLICY "anon_update_docs_pages" ON docs_pages
FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_docs_pages" ON docs_pages;
CREATE POLICY "anon_delete_docs_pages" ON docs_pages
FOR DELETE TO anon, authenticated USING (true);

CREATE OR REPLACE FUNCTION set_docs_pages_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS docs_pages_set_updated_at ON docs_pages;
CREATE TRIGGER docs_pages_set_updated_at
BEFORE UPDATE ON docs_pages
FOR EACH ROW EXECUTE FUNCTION set_docs_pages_updated_at();

INSERT INTO docs_pages (title, category, content, sort_order)
SELECT 'Meet the Corral', 'General',
'Howdy, partner!

This here Help Corral is your own docs barn - a place to park development
notes, how-tos, decision logs, and anything else worth rememberin''.

How it works:
- Every entry is a page, filed under a category.
- Use the "Rope a New Page" button to add one.
- Open any page to read it, or hit "Edit" to change it.
- Pages are saved for good - no need to worry about losin'' your trail notes.

This page is a placeholder. Edit it, or clear it out and start penning
your own.',
0
WHERE NOT EXISTS (SELECT 1 FROM docs_pages WHERE title = 'Meet the Corral');

INSERT INTO docs_pages (title, category, content, sort_order)
SELECT 'Development Notes', 'Development',
'Jot down how the outpost is built, decisions made along the trail,
and anything the next cowpoke to ride through ought to know.

Suggested sections:
- Setup notes
- Gotchas and quicksand patches
- Ideas for the next ride',
1
WHERE NOT EXISTS (SELECT 1 FROM docs_pages WHERE title = 'Development Notes');

INSERT INTO docs_pages (title, category, content, sort_order)
SELECT 'Snippets & Shortcuts', 'Development',
'A handy fence post to hang code snippets and keyboard tricks on.

Paste in commands, configurations, or that one regex you always forget.
Whatever helps you ride faster next time.',
2
WHERE NOT EXISTS (SELECT 1 FROM docs_pages WHERE title = 'Snippets & Shortcuts');
