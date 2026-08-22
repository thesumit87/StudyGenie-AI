import { useState } from "react";
import "./Notes.css";

function Notes({ onBack }) {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("studygenieNotes");

    if (savedNotes) {
      return JSON.parse(savedNotes);
    }

    return [
      {
        id: 1,
        title: "Java OOP Concepts",
        subject: "Java",
        content:
          "OOP is based on classes and objects. Main concepts are Encapsulation, Inheritance, Polymorphism and Abstraction.",
      },
      {
        id: 2,
        title: "Operating System",
        subject: "Operating System",
        content:
          "An Operating System manages computer hardware and provides services for applications.",
      },
      {
        id: 3,
        title: "DBMS Basics",
        subject: "DBMS",
        content:
          "DBMS is software used to store, manage and retrieve data from databases.",
      },
    ];
  });

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const saveNotes = (updatedNotes) => {
    setNotes(updatedNotes);

    localStorage.setItem(
      "studygenieNotes",
      JSON.stringify(updatedNotes)
    );
  };

  const addNote = (e) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !subject.trim() ||
      !content.trim()
    ) {
      return;
    }

    const newNote = {
      id: Date.now(),
      title: title.trim(),
      subject: subject.trim(),
      content: content.trim(),
    };

    const updatedNotes = [newNote, ...notes];

    saveNotes(updatedNotes);

    setTitle("");
    setSubject("");
    setContent("");
    setShowForm(false);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(
      (note) => note.id !== id
    );

    saveNotes(updatedNotes);

    if (selectedNote?.id === id) {
      setSelectedNote(null);
    }
  };

  const filteredNotes = notes.filter((note) => {
    const text =
      `${note.title} ${note.subject} ${note.content}`.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  return (
    <div className="notes-page">

      {/* Header */}

      <header className="notes-header">

        <button
          className="back-btn"
          onClick={onBack}
        >
          ← Dashboard
        </button>

        <div>
          <h1>📄 My Notes</h1>
          <p>Manage your study notes in one place</p>
        </div>

      </header>

      <main className="notes-main">

        {/* Search + Add */}

        <div className="notes-top">

          <div className="search-box">

            <span>🔍</span>

            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <button
            className="add-note-btn"
            onClick={() =>
              setShowForm(!showForm)
            }
          >
            {showForm ? "✕ Close" : "+ Add Note"}
          </button>

        </div>

        {/* Add Note Form */}

        {showForm && (
          <form
            className="note-form"
            onSubmit={addNote}
          >

            <h2>Add New Note</h2>

            <input
              type="text"
              placeholder="Note title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) =>
                setSubject(e.target.value)
              }
            />

            <textarea
              placeholder="Write your notes here..."
              value={content}
              onChange={(e) =>
                setContent(e.target.value)
              }
              rows="6"
            />

            <div className="form-buttons">

              <button
                type="submit"
                className="save-note-btn"
              >
                Save Note
              </button>

              <button
                type="button"
                className="cancel-note-btn"
                onClick={() =>
                  setShowForm(false)
                }
              >
                Cancel
              </button>

            </div>

          </form>
        )}

        {/* Notes */}

        <div className="notes-grid">

          {filteredNotes.length > 0 ? (

            filteredNotes.map((note) => (

              <div
                className="note-card"
                key={note.id}
              >

                <div className="note-card-top">

                  <span className="note-icon">
                    📘
                  </span>

                  <button
                    className="delete-note"
                    onClick={() =>
                      deleteNote(note.id)
                    }
                    title="Delete note"
                  >
                    🗑️
                  </button>

                </div>

                <h3>
                  {note.title}
                </h3>

                <span className="note-subject">
                  {note.subject}
                </span>

                {/* Short Note Preview */}

                <p className="note-preview">
                  {note.content.length > 140
                    ? note.content.substring(0, 140) + "..."
                    : note.content}
                </p>

                <button
                  className="open-note-btn"
                  onClick={() =>
                    setSelectedNote(note)
                  }
                >
                  Open Note →
                </button>

              </div>

            ))

          ) : (

            <div className="no-notes">

              <span>📄</span>

              <h3>
                No notes found
              </h3>

              <p>
                Try another search or create a new note.
              </p>

            </div>

          )}

        </div>

      </main>

      {/* Full Note Viewer */}

      {selectedNote && (

        <div
          className="note-viewer-overlay"
          onClick={() =>
            setSelectedNote(null)
          }
        >

          <div
            className="note-viewer"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="note-viewer-header">

              <div>

                <span className="viewer-icon">
                  📘
                </span>

                <div>

                  <h2>
                    {selectedNote.title}
                  </h2>

                  <span className="note-subject">
                    {selectedNote.subject}
                  </span>

                </div>

              </div>

              <button
                className="close-viewer"
                onClick={() =>
                  setSelectedNote(null)
                }
              >
                ✕
              </button>

            </div>

            <div className="note-viewer-content">

              <p>
                {selectedNote.content}
              </p>

            </div>

            <div className="note-viewer-footer">

              <button
                className="close-note-btn"
                onClick={() =>
                  setSelectedNote(null)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Notes;