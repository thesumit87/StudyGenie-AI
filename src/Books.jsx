import { useMemo, useState } from "react";
import "./Books.css";

const CATEGORIES = [
  "All",
  "DSA",
  "Web Development",
  "Operating System",
  "DBMS",
  "Computer Networks",
  "Aptitude",
  "Programming",
];

const BOOKS = [
  {
    id: 1,
    title: "Data Structures and Algorithms",
    author: "Mark Allen Weiss",
    category: "DSA",
    tags: ["DSA", "Programming"],
    rating: "4.8",
    reviews: "2.1k",
    color: "blue",
    cover: "https://covers.openlibrary.org/isbn/9780201615712-L.jpg",
    searchUrl:
      "https://www.google.com/search?q=Data+Structures+and+Algorithms+Mark+Allen+Weiss",
  },
  {
    id: 2,
    title: "Operating System Concepts",
    author: "Silberschatz, Galvin, Gagne",
    category: "Operating System",
    tags: ["Operating System"],
    rating: "4.7",
    reviews: "1.5k",
    color: "purple",
    cover: "https://covers.openlibrary.org/isbn/9781119456339-L.jpg",
    searchUrl:
      "https://www.google.com/search?q=Operating+System+Concepts+Silberschatz",
  },
  {
    id: 3,
    title: "Database System Concepts",
    author: "Silberschatz, Korth, Sudarshan",
    category: "DBMS",
    tags: ["DBMS"],
    rating: "4.6",
    reviews: "1.3k",
    color: "green",
    cover: "https://covers.openlibrary.org/isbn/9780073523323-L.jpg",
    searchUrl:
      "https://www.google.com/search?q=Database+System+Concepts+Silberschatz",
  },
  {
    id: 4,
    title: "Computer Networking",
    author: "Andrew S. Tanenbaum",
    category: "Computer Networks",
    tags: ["Computer Networks"],
    rating: "4.6",
    reviews: "1.2k",
    color: "dark",
    cover: "https://covers.openlibrary.org/isbn/9780132126953-L.jpg",
    searchUrl:
      "https://www.google.com/search?q=Computer+Networks+Tanenbaum",
  },
  {
    id: 5,
    title: "Java: The Complete Reference",
    author: "Herbert Schildt",
    category: "Programming",
    tags: ["Java", "Programming"],
    rating: "4.7",
    reviews: "980",
    color: "orange",
    cover: "https://covers.openlibrary.org/isbn/9781260440232-L.jpg",
    searchUrl:
      "https://www.google.com/search?q=Java+The+Complete+Reference+Herbert+Schildt",
  },
  {
    id: 6,
    title: "HTML and CSS",
    author: "Jon Duckett",
    category: "Web Development",
    tags: ["HTML", "CSS"],
    rating: "4.8",
    reviews: "1.8k",
    color: "pink",
    cover: "https://covers.openlibrary.org/isbn/9781118008188-L.jpg",
    searchUrl:
      "https://www.google.com/search?q=HTML+CSS+Jon+Duckett",
  },
  {
    id: 7,
    title: "JavaScript: The Definitive Guide",
    author: "David Flanagan",
    category: "Web Development",
    tags: ["JavaScript"],
    rating: "4.7",
    reviews: "1.1k",
    color: "yellow",
    cover: "https://covers.openlibrary.org/isbn/9781491952023-L.jpg",
    searchUrl:
      "https://www.google.com/search?q=JavaScript+The+Definitive+Guide",
  },
  {
    id: 8,
    title: "Quantitative Aptitude",
    author: "R.S. Aggarwal",
    category: "Aptitude",
    tags: ["Aptitude", "Placement"],
    rating: "4.5",
    reviews: "2.4k",
    color: "teal",
    cover: "https://covers.openlibrary.org/isbn/9789352534026-L.jpg",
    searchUrl:
      "https://www.google.com/search?q=Quantitative+Aptitude+RS+Aggarwal",
  },
];

function Books() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [bookmarks, setBookmarks] = useState([]);

  const filteredBooks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return BOOKS.filter((book) => {
      const categoryMatch =
        activeCategory === "All" || book.category === activeCategory;

      const searchMatch =
        !query ||
        `${book.title} ${book.author} ${book.category} ${book.tags.join(" ")}`
          .toLowerCase()
          .includes(query);

      return categoryMatch && searchMatch;
    });
  }, [search, activeCategory]);

  const toggleBookmark = (id) => {
    setBookmarks((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const openBook = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="books-page">
      <section className="books-hero">
        <div className="books-hero-content">
          <span className="books-eyebrow">LEARNING RESOURCES</span>

          <h1>
            Study Books <span>Library</span>
          </h1>

          <p>
            Explore the best books and learning resources for your placement
            preparation and skill development.
          </p>

          <div className="books-hero-search">
            <span>⌕</span>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search books by title, author or subject..."
            />
          </div>
        </div>

        <div className="books-hero-illustration">
          <div className="book-stack">
            <div className="stack-book stack-dsa">DSA</div>
            <div className="stack-book stack-system">System Design</div>
            <div className="stack-book stack-aptitude">Aptitude</div>
            <div className="stack-book stack-web">Web Development</div>
          </div>

          <div className="hero-plant">🌿</div>
          <span className="hero-spark spark-one">✦</span>
          <span className="hero-spark spark-two">✦</span>
          <span className="hero-spark spark-three">✦</span>
        </div>
      </section>

      <div className="books-category-row">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            className={activeCategory === category ? "active" : ""}
            onClick={() => setActiveCategory(category)}
          >
            <span>
              {category === "All"
                ? "✦"
                : category === "DSA"
                ? "</>"
                : category === "Web Development"
                ? "◎"
                : category === "Operating System"
                ? "▣"
                : category === "DBMS"
                ? "▤"
                : category === "Computer Networks"
                ? "⌁"
                : category === "Aptitude"
                ? "▥"
                : "›_"}
            </span>
            {category}
          </button>
        ))}
      </div>

      <section className="books-stats">
        <div className="book-stat purple-stat">
          <div className="stat-symbol">▣</div>
          <div>
            <strong>50+</strong>
            <span>Books & Resources</span>
          </div>
        </div>

        <div className="book-stat blue-stat">
          <div className="stat-symbol">♙</div>
          <div>
            <strong>8</strong>
            <span>Subjects Covered</span>
          </div>
        </div>

        <div className="book-stat green-stat">
          <div className="stat-symbol">☆</div>
          <div>
            <strong>100%</strong>
            <span>Free to Access</span>
          </div>
        </div>

        <div className="book-stat pink-stat">
          <div className="stat-symbol">♡</div>
          <div>
            <strong>Curated</strong>
            <span>For Placement Prep</span>
          </div>
        </div>
      </section>

      <section className="popular-books">
        <div className="popular-heading">
          <div>
            <h2>Popular Books</h2>
            <p>Most recommended books for placement preparation.</p>
          </div>

          <button
            type="button"
            onClick={() => {
              setActiveCategory("All");
              setSearch("");
            }}
          >
            View All →
          </button>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="books-grid">
            {filteredBooks.map((book) => (
              <article className="book-card" key={book.id}>
                <div className={`book-cover ${book.color}`}>
                  <img
                    src={book.cover}
                    alt={book.title}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement.classList.add(
                        "cover-fallback"
                      );
                    }}
                  />

                  <div className="cover-fallback-text">
                    <span>BOOK</span>
                    <strong>{book.category}</strong>
                  </div>
                </div>

                <div className="book-details">
                  <h3>{book.title}</h3>

                  <p className="book-author">{book.author}</p>

                  <div className="book-tags">
                    {book.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="book-rating">
                    <span className="stars">★★★★★</span>
                    <span>
                      {book.rating} ({book.reviews})
                    </span>
                  </div>

                  <div className="book-actions">
                    <button
                      type="button"
                      className="read-book-btn"
                      onClick={() => openBook(book.searchUrl)}
                    >
                      <span>▣</span>
                      Read Now
                    </button>

                    <button
                      type="button"
                      className={`bookmark-btn ${
                        bookmarks.includes(book.id) ? "saved" : ""
                      }`}
                      onClick={() => toggleBookmark(book.id)}
                      aria-label="Bookmark book"
                    >
                      {bookmarks.includes(book.id) ? "♥" : "♡"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="books-empty">
            <div>🔎</div>
            <h3>No books found</h3>
            <p>Try another book title, author or category.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Books;
