import { useState } from "react";
import "./Notes.css";

function Notes() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("studygenieNotes");

    if (savedNotes) {
      try {
        return JSON.parse(savedNotes);
      } catch {
        return [];
      }
    }

    return [
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
  });

  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const subjects = [
    "All",
    "Computer Networks",
    "Java",
    "Operating System",
    "DBMS",
    "DSA",
    "Web Development",
  ];

  const saveNotes = (updatedNotes) => {
    setNotes(updatedNotes);

    localStorage.setItem(
      "studygenieNotes",
      JSON.stringify(updatedNotes)
    );

    window.dispatchEvent(
      new Event("studygenie-update")
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

    saveNotes([newNote, ...notes]);

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
    const matchesSubject =
      selectedSubject === "All" ||
      note.subject === selectedSubject;

    const searchText =
      `${note.title} ${note.subject} ${note.content}`.toLowerCase();

    const matchesSearch =
      searchText.includes(search.toLowerCase());

    return matchesSubject && matchesSearch;
  });

  const getSubjectIcon = (subjectName) => {
    if (subjectName === "Computer Networks") {
      return "🌐";
    }

    if (subjectName === "Java") {
      return "☕";
    }

    if (subjectName === "Operating System") {
      return "💻";
    }

    if (subjectName === "DBMS") {
      return "🗄️";
    }

    if (subjectName === "DSA") {
      return "⌘";
    }

    if (subjectName === "Web Development") {
      return "</>";
    }

    return "📘";
  };

  const getSubjectClass = (subjectName) => {
    if (subjectName === "Computer Networks") {
      return "network";
    }

    if (subjectName === "Java") {
      return "java";
    }

    if (subjectName === "Operating System") {
      return "os";
    }

    if (subjectName === "DBMS") {
      return "dbms";
    }

    if (subjectName === "DSA") {
      return "dsa";
    }

    if (subjectName === "Web Development") {
      return "web";
    }

    return "default";
  };

  return (
    <section className="notes-content">

      <div className="notes-hero">

        <div className="notes-hero-text">

          <div className="notes-label">
            STUDY MATERIAL
          </div>

          <h1>
            My <span>Notes</span>
          </h1>

          <p>
            Create, organize and manage your study notes
            in one place.
          </p>

        </div>

        <div className="notes-illustration">

          <div className="book-stack">

            <div className="book book-blue">
              📘
            </div>

            <div className="book book-purple">
              📕
            </div>

            <div className="book book-orange">
              📙
            </div>

          </div>

          <div className="future-text">
            Better
            <br />
            Notes
            <br />
            <b>Brighter Future</b>
          </div>

        </div>

        <button
          type="button"
          className="add-note-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "✕ Close" : "+ Add Note"}
        </button>

      </div>

      <div className="subject-filters">

        {subjects.map((item) => (
          <button
            key={item}
            type="button"
            className={
              selectedSubject === item
                ? "subject-filter active"
                : "subject-filter"
            }
            onClick={() =>
              setSelectedSubject(item)
            }
          >
            <span>
              {item === "All"
                ? "▦"
                : getSubjectIcon(item)}
            </span>

            {item}
          </button>
        ))}

      </div>

      {showForm && (
        <form
          className="note-form"
          onSubmit={addNote}
        >

          <div className="form-title">
            <h2>Create New Note</h2>
            <p>
              Add your study material below.
            </p>
          </div>

          <div className="form-row">

            <input
              type="text"
              placeholder="Note title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              required
            />

            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) =>
                setSubject(e.target.value)
              }
              required
            />

          </div>

          <textarea
            placeholder="Write your notes here..."
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            rows="5"
            required
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

      <div className="notes-tools">

        <div className="notes-search">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Search your notes..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <div className="notes-tools-right">

          <button
            type="button"
            className="sort-btn"
          >
            ↕ Newest First
            <span>⌄</span>
          </button>

          <div className="view-buttons">

            <button
              type="button"
              className="view-active"
            >
              ▦
            </button>

            <button type="button">
              ☷
            </button>

          </div>

          <span className="note-total">
            {filteredNotes.length} Notes
          </span>

        </div>

      </div>

      <div className="notes-grid">

        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => {

            const subjectClass =
              getSubjectClass(note.subject);

            return (
              <article
                className={`note-card ${subjectClass}`}
                key={note.id}
              >

                <div className="note-card-top">

                  <div
                    className={`note-icon ${subjectClass}`}
                  >
                    {getSubjectIcon(note.subject)}
                  </div>

                  <span
                    className={`note-subject ${subjectClass}`}
                  >
                    {note.subject}
                  </span>

                  <button
                    type="button"
                    className="delete-note"
                    onClick={() =>
                      deleteNote(note.id)
                    }
                    title="Delete note"
                  >
                    ⋮
                  </button>

                </div>

                <h3>
                  {note.title}
                </h3>

                <p className="note-preview">
                  {note.content.length > 155
                    ? `${note.content.substring(
                        0,
                        155
                      )}...`
                    : note.content}
                </p>

                <div className="note-card-bottom">

                  <span className="note-date">
                    ◫ Study Note
                  </span>

                  <button
                    type="button"
                    className="open-note-btn"
                    onClick={() =>
                      setSelectedNote(note)
                    }
                  >
                    Read Note →
                  </button>

                </div>

              </article>
            );
          })
        ) : (
          <div className="no-notes">

            <div className="empty-note-icon">
              🔍
            </div>

            <h3>
              No notes found
            </h3>

            <p>
              Try another subject or search term.
            </p>

          </div>
        )}

      </div>

      <div className="notes-reminder">

        <div className="reminder-icon">
          ✦
        </div>

        <div className="reminder-text">

          <h3>
            Keep your notes organized!
          </h3>

          <p>
            Well-organized notes help you revise faster
            and remember better.
          </p>

        </div>

        <button
          type="button"
          onClick={() => setShowForm(true)}
        >
          Create a new note →
        </button>

      </div>

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

              <div className="viewer-title">

                <div className="viewer-icon">
                  {getSubjectIcon(
                    selectedNote.subject
                  )}
                </div>

                <div>
                  <h2>
                    {selectedNote.title}
                  </h2>

                  <span
                    className={`note-subject ${getSubjectClass(
                      selectedNote.subject
                    )}`}
                  >
                    {selectedNote.subject}
                  </span>
                </div>

              </div>

              <button
                type="button"
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
                type="button"
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

    </section>
  );
}

export default Notes;