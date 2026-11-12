import React, { useMemo, useState } from 'react';
import { useDocsPages } from './useDocsPages';

const CATEGORIES = ['General', 'Development', 'Guides', 'Notes'];

const HelpCorral = () => {
  const { pages, loading, error, createPage, updatePage, deletePage } = useDocsPages();
  const [selectedId, setSelectedId] = useState(null);
  const [mode, setMode] = useState('read'); // 'read' | 'edit' | 'new'
  const [form, setForm] = useState({ title: '', category: 'General', content: '' });
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState(null);
  const [search, setSearch] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const selected = pages.find((p) => p.id === selectedId) || null;

  const grouped = useMemo(() => {
    const term = search.trim().toLowerCase();
    const filtered = pages.filter(
      (p) =>
        !term ||
        p.title.toLowerCase().includes(term) ||
        p.content.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
    const map = new Map();
    filtered.forEach((p) => {
      if (!map.has(p.category)) map.set(p.category, []);
      map.get(p.category).push(p);
    });
    return [...map.entries()];
  }, [pages, search]);

  const openNew = () => {
    setForm({ title: '', category: 'General', content: '' });
    setSelectedId(null);
    setMode('new');
    setActionError(null);
  };

  const openEdit = (page) => {
    setForm({ title: page.title, category: page.category, content: page.content });
    setSelectedId(page.id);
    setMode('edit');
    setActionError(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setActionError("Every page needs a title, partner.");
      return;
    }
    setSaving(true);
    setActionError(null);
    try {
      if (mode === 'edit') {
        await updatePage(selectedId, form);
        setMode('read');
      } else {
        const newId = await createPage(form);
        setSelectedId(newId);
        setMode('read');
      }
    } catch (err) {
      setActionError(err.message || "Somethin' went sideways savin' that page.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePage(confirmDeleteId);
      if (selectedId === confirmDeleteId) {
        setSelectedId(null);
        setMode('read');
      }
      setConfirmDeleteId(null);
    } catch (err) {
      setActionError(err.message || "Couldn't tear down that page.");
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-300 via-amber-500 to-amber-900 opacity-20"></div>

      <nav className="relative z-20 p-4">
        <button
          onClick={() => window.location.href = './'}
          className="flex items-center gap-2 px-4 py-2 bg-amber-800/30 hover:bg-amber-700/40 text-amber-200 rounded-lg border border-amber-600/30 transition-all"
        >
          ⬅️ Back to Desert Outpost
        </button>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-16">
        <header className="text-center py-8">
          <h1 className="text-5xl md:text-6xl font-bold text-amber-100 mb-3 drop-shadow-lg">
            🤠 The Help Corral
          </h1>
          <p className="text-xl text-amber-200 italic">
            "Your own docs barn - rope up pages and brand 'em for good"
          </p>
        </header>

        {mode === 'read' && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍 Search the corral..."
              className="w-full sm:max-w-xs px-3 py-2 bg-amber-900/20 border border-amber-600/30 rounded-lg text-amber-100 placeholder-amber-300/60"
            />
            <button
              onClick={openNew}
              className="w-full sm:w-auto px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-medium shadow-lg transition"
            >
              🪢 Rope a New Page
            </button>
          </div>
        )}

        {error && (
          <div className="bg-red-900/30 border border-red-500/40 text-red-200 rounded-lg p-4 mb-6">
            Couldn't reach the docs barn: {error}
          </div>
        )}
        {actionError && (
          <div className="bg-red-900/30 border border-red-500/40 text-red-200 rounded-lg p-4 mb-6">
            {actionError}
          </div>
        )}

        {loading ? (
          <div className="text-center text-amber-200 py-16">Ridin' out to fetch your pages...</div>
        ) : mode === 'read' ? (
          <ReadView
            grouped={grouped}
            pages={pages}
            selected={selected}
            onSelect={(id) => { setSelectedId(id); setActionError(null); }}
            onEdit={openEdit}
            onDeleteAsk={(id) => setConfirmDeleteId(id)}
          />
        ) : (
          <form
            onSubmit={handleSave}
            className="bg-amber-900/20 backdrop-blur-sm rounded-lg p-6 border border-amber-600/30 space-y-4"
          >
            <h2 className="text-2xl font-bold text-amber-100">
              {mode === 'edit' ? '✏️ Reshape This Page' : '🪢 Rope a New Page'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm text-amber-200 mb-1">Page Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. How the chart saloon works"
                  className="w-full px-3 py-2 bg-amber-900/20 border border-amber-600/30 rounded-lg text-amber-100 placeholder-amber-300/50"
                />
              </div>
              <div>
                <label className="block text-sm text-amber-200 mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2 bg-amber-900/20 border border-amber-600/30 rounded-lg text-amber-100"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} className="bg-amber-900 text-amber-100">{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm text-amber-200 mb-1">
                Page Content (plain text - blank lines start a new paragraph)
              </label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={14}
                placeholder="Write whatever you need here - notes, steps, snippets, checklists..."
                className="w-full px-3 py-2 bg-amber-900/20 border border-amber-600/30 rounded-lg text-amber-100 placeholder-amber-300/50 leading-relaxed"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-medium shadow-lg transition disabled:opacity-50"
              >
                {saving ? 'Brandin\' it in...' : '💾 Save Page'}
              </button>
              <button
                type="button"
                onClick={() => { setMode('read'); setActionError(null); }}
                className="px-5 py-2 bg-amber-900/30 hover:bg-amber-800/40 text-amber-200 rounded-lg border border-amber-600/30 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-amber-950 border border-amber-600/40 rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold text-amber-100 mb-2">Tear down this page?</h3>
            <p className="text-amber-200 mb-6 text-sm">
              This page rides off into the sunset for good. There's no bringin' it back.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 bg-amber-900/30 hover:bg-amber-800/40 text-amber-200 rounded-lg border border-amber-600/30 transition"
              >
                Keep it
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ReadView = ({ grouped, pages, selected, onSelect, onEdit, onDeleteAsk }) => {
  if (pages.length === 0) {
    return (
      <div className="bg-amber-900/20 backdrop-blur-sm rounded-lg p-10 border border-amber-600/30 text-center">
        <div className="text-5xl mb-4">🏜️</div>
        <h2 className="text-2xl font-bold text-amber-100 mb-2">This corral's empty</h2>
        <p className="text-amber-200 mb-6">
          No pages yet. Rope a new one and start penning your docs.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Sidebar page list */}
      <aside className="md:col-span-1 bg-amber-900/20 backdrop-blur-sm rounded-lg p-4 border border-amber-600/30 max-h-[70vh] overflow-y-auto">
        {grouped.map(([category, catPages]) => (
          <div key={category} className="mb-4">
            <h3 className="text-xs uppercase tracking-wider text-amber-300 mb-2 border-b border-amber-600/30 pb-1">
              {category}
            </h3>
            <ul className="space-y-1">
              {catPages.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => onSelect(p.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                      selected?.id === p.id
                        ? 'bg-amber-600 text-white font-medium'
                        : 'text-amber-100 hover:bg-amber-800/30'
                    }`}
                  >
                    {p.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>

      {/* Page reader */}
      <section className="md:col-span-2">
        {selected ? (
          <article className="bg-amber-900/20 backdrop-blur-sm rounded-lg p-6 border border-amber-600/30">
            <div className="flex justify-between items-start gap-4 mb-2">
              <h2 className="text-3xl font-bold text-amber-100">{selected.title}</h2>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => onEdit(selected)}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-sm font-medium transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => onDeleteAsk(selected.id)}
                  className="px-3 py-1.5 bg-red-600/80 hover:bg-red-500 text-white rounded-lg text-sm font-medium transition"
                >
                  🗑️
                </button>
              </div>
            </div>
            <p className="text-xs text-amber-300 mb-6 border-b border-amber-600/30 pb-3">
              Filed under <span className="font-semibold">{selected.category}</span>
              {' '}· Last updated {new Date(selected.updated_at).toLocaleDateString()}
            </p>
            <div className="text-amber-100 leading-relaxed whitespace-pre-wrap">
              {selected.content || <span className="text-amber-300 italic">This page is waitin' for its first words. Hit Edit to start writin'.</span>}
            </div>
          </article>
        ) : (
          <div className="bg-amber-900/20 backdrop-blur-sm rounded-lg p-10 border border-amber-600/30 text-center h-full flex flex-col items-center justify-center">
            <div className="text-5xl mb-4">👈</div>
            <p className="text-amber-200">
              Pick a page from the corral to give it a read.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default HelpCorral;
