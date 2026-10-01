import { useEffect, useMemo, useState } from "react";
import "./Notes.css";

const STORAGE_KEY = "studygenieNotes";
const DEFAULT_NOTES = [
  {
    id: 1,
    title: "Computer Networks Basics",
    subject: "Computer Networks",
    content:
      "Computer Network is a group of interconnected computers and devices that communicate and share data and resources. Main components of a computer network include routers, switches and communication protocols.",
  },
  {
    id: 2,
    title: "Java OOP Concepts",
    subject: "Java",
    content:
      "OOP is based on classes and objects. Main concepts are Encapsulation, Inheritance, Polymorphism and Abstraction.",
  },
  {
    id: 3,
    title: "Operating System",
    subject: "Operating System",
    content:
      "An Operating System manages computer hardware and provides services for applications. It manages memory, processes, files and devices.",
  },
];

const SUBJECTS = [
  "Computer Networks",
  "Java",
  "Operating System",
  "DBMS",
  "DSA",
  "Web Development",
];

function readStoredNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) return DEFAULT_NOTES;
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : DEFAULT_NOTES;
  } catch {
    return DEFAULT_NOTES;
  }
}

function subjectIcon(subject) {
  const icons = {
    "Computer Networks": "🌐",
    Java: "☕",
    "Operating System": "💻",
    DBMS: "▤",
    DSA: "⌘",
    "Web Development": "</>",
  };
  return icons[subject] || "📘";
}

function formatDate(value) {
  if (!value) return "Study note";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Study note";
  return `Edited ${date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  })}`;
}

function Notes() {
  const [notes, setNotes] = useState(readStoredNotes);
  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [activeId, setActiveId] = useState(null);
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    window.dispatchEvent(new Event("studygenie-update"));
  }, [notes]);

  const subjects = useMemo(
    () => ["All", ...new Set([...SUBJECTS, ...notes.map((note) => note.subject).filter(Boolean)])],
    [notes]
  );

  const filteredNotes = useMemo(() => {
    const query = search.trim().toLowerCase();
    return notes.filter((note) => {
      const matchesSubject = selectedSubject === "All" || note.subject === selectedSubject;
      const matchesSearch = `${note.title} ${note.subject} ${note.content}`
        .toLowerCase()
        .includes(query);
      return matchesSubject && matchesSearch;
    });
  }, [notes, search, selectedSubject]);

  const activeNote = notes.find((note) => note.id === activeId);
  const editor = draft || (activeNote ? { ...activeNote } : null);

  function openNewNote() {
    setActiveId(null);
    setDraft({ id: null, title: "", subject: "", content: "" });
  }

  function openNote(note) {
    setActiveId(note.id);
    setDraft(null);
  }

  function closeEditor() {
    setActiveId(null);
    setDraft(null);
  }

  function updateEditor(field, value) {
    if (draft) {
      setDraft((current) => ({ ...current, [field]: value }));
      return;
    }
    setNotes((current) =>
      current.map((note) =>
        note.id === activeId
          ? { ...note, [field]: value, updatedAt: new Date().toISOString() }
          : note
      )
    );
  }

  function saveNote(event) {
    event.preventDefault();
    if (!editor?.title.trim() || !editor?.subject.trim() || !editor?.content.trim()) return;

    if (draft) {
      const created = {
        ...draft,
        id: Date.now(),
        title: draft.title.trim(),
        subject: draft.subject.trim(),
        content: draft.content.trim(),
        updatedAt: new Date().toISOString(),
      };
      setNotes((current) => [created, ...current]);
      setActiveId(created.id);
      setDraft(null);
      return;
    }

    setNotes((current) =>
      current.map((note) =>
        note.id === activeId
          ? { ...note, title: editor.title.trim(), subject: editor.subject.trim(), content: editor.content.trim(), updatedAt: new Date().toISOString() }
          : note
      )
    );
  }

  function deleteNote(id) {
    setNotes((current) => current.filter((note) => note.id !== id));
    if (activeId === id) closeEditor();
  }

  return (
    <section className="notes-page">
      <header className="notes-page-heading">
        <div>
          <span className="notes-eyebrow">YOUR STUDY SPACE</span>
          <h1>My <span>Notes</span></h1>
          <p>Keep your ideas and study material in one calm, organized space.</p>
        </div>
        {!editor && (
          <button className="notes-primary-button" type="button" onClick={openNewNote}>
            <span aria-hidden="true">＋</span> New note
          </button>
        )}
      </header>

      <div className={`notes-workspace${editor ? " is-editing" : ""}`}>
        <aside className="notes-sidebar" aria-label="Notes library">
          <div className="notes-sidebar-top">
            <div>
              <h2>My library</h2>
              <span>{filteredNotes.length} {filteredNotes.length === 1 ? "note" : "notes"}</span>
            </div>
            <button className="notes-new-icon" type="button" onClick={openNewNote} aria-label="Create a new note">＋</button>
          </div>

          <label className="notes-search">
            <span aria-hidden="true">⌕</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search notes" />
            {search && <button type="button" onClick={() => setSearch("")} aria-label="Clear search">×</button>}
          </label>

          <div className="notes-filter-label">SUBJECTS</div>
          <nav className="notes-subject-filters" aria-label="Filter by subject">
            {subjects.map((subject) => (
              <button
                className={selectedSubject === subject ? "active" : ""}
                key={subject}
                type="button"
                onClick={() => setSelectedSubject(subject)}
              >
                <span className="subject-filter-icon">{subject === "All" ? "▦" : subjectIcon(subject)}</span>
                <span>{subject}</span>
                {subject === "All" && <small>{notes.length}</small>}
              </button>
            ))}
          </nav>

          <div className="notes-list-heading">RECENT NOTES</div>
          <div className="notes-list">
            {filteredNotes.length ? filteredNotes.map((note) => (
              <button
                className={`notes-list-item${activeId === note.id ? " selected" : ""}`}
                key={note.id}
                type="button"
                onClick={() => openNote(note)}
              >
                <span className="notes-list-item-icon">{subjectIcon(note.subject)}</span>
                <span className="notes-list-item-copy">
                  <strong>{note.title || "Untitled note"}</strong>
                  <small>{note.subject || "No subject"} <i>·</i> {formatDate(note.updatedAt)}</small>
                </span>
                <span className="notes-list-chevron" aria-hidden="true">›</span>
              </button>
            )) : (
              <div className="notes-list-empty">No notes match your search.</div>
            )}
          </div>
        </aside>

        <main className="notes-editor-panel">
          {editor ? (
            <form className="note-editor" onSubmit={saveNote}>
              <div className="editor-topbar">
                <button className="editor-back-button" type="button" onClick={closeEditor}>
                  <span aria-hidden="true">←</span> All notes
                </button>
                <div className="editor-actions">
                  {!draft && <button className="editor-delete-button" type="button" onClick={() => deleteNote(activeId)}>Delete</button>}
                  <button className="notes-primary-button editor-save-button" type="submit">{draft ? "Save note" : "Save changes"}</button>
                </div>
              </div>

              <div className="editor-document">
                <div className="editor-subject-row">
                  <span className="editor-subject-icon">{subjectIcon(editor.subject)}</span>
                  <input
                    className="editor-subject-input"
                    list="notes-subject-options"
                    value={editor.subject}
                    onChange={(event) => updateEditor("subject", event.target.value)}
                    placeholder="Choose or type a subject"
                    aria-label="Subject"
                    required
                  />
                  <datalist id="notes-subject-options">{subjects.filter((item) => item !== "All").map((item) => <option key={item} value={item} />)}</datalist>
                </div>
                <input
                  className="editor-title-input"
                  value={editor.title}
                  onChange={(event) => updateEditor("title", event.target.value)}
                  placeholder="Untitled note"
                  aria-label="Note title"
                  required
                />
                <div className="editor-meta">{draft ? "A new page, ready for your ideas" : formatDate(activeNote?.updatedAt)}</div>
                <div className="editor-divider" />
                <div className="editor-writing-label">YOUR NOTES</div>
                <textarea
                  className="editor-content-input"
                  value={editor.content}
                  onChange={(event) => updateEditor("content", event.target.value)}
                  placeholder="Start writing here…\n\nAdd key ideas, definitions, questions, or anything you want to remember."
                  aria-label="Note content"
                  required
                />
                <div className="editor-footer-hint">Your notes are saved on this device.</div>
              </div>
            </form>
          ) : (
            <div className="notes-welcome">
              <div className="welcome-icon" aria-hidden="true">✎</div>
              <span className="notes-eyebrow">A CLEARER WAY TO STUDY</span>
              <h2>Your notes, <span>in focus.</span></h2>
              <p>Select a note from your library to read and edit it, or start a fresh page for a new idea.</p>
              <button className="notes-primary-button" type="button" onClick={openNewNote}>＋ Create a note</button>
              <div className="welcome-note-count">{notes.length} {notes.length === 1 ? "note" : "notes"} in your library</div>
            </div>
          )}
        </main>
      </div>
    </section>
  );
}

export default Notes;
