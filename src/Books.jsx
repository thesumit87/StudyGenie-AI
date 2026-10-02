import { useMemo, useState } from "react";
import "./Books.css";

/* ---------- Icons (inline SVG, no extra package needed) ---------- */

const ICON_PATHS = {
  all: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  dsa: (
    <>
      <polyline points="8 6 2 12 8 18" />
      <polyline points="16 6 22 12 16 18" />
    </>
  ),
  web: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" />
    </>
  ),
  os: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    </>
  ),
  db: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>
  ),
  net: (
    <>
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6" />
    </>
  ),
  apt: <path d="M4 21V11h4v10M10 21V4h4v17M16 21v-7h4v7" />,
  prog: (
    <>
      <polyline points="4 6 10 12 4 18" />
      <path d="M12 19h8" />
    </>
  ),
  book: (
    <>
      <path d="M2 4h7a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H2z" />
      <path d="M22 4h-7a3 3 0 0 0-3 3v14a2 2 0 0 1 2-2h8z" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>
  ),
};

function Icon({ name, size = 18, filled = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
  );
}

/* ---------- Data ---------- */

const CATEGORIES = [
  { name: "All", icon: "all" },
  { name: "DSA", icon: "dsa" },
  { name: "Web Development", icon: "web" },
  { name: "Operating System", icon: "os" },
  { name: "DBMS", icon: "db" },
  { name: "Computer Networks", icon: "net" },
  { name: "Aptitude", icon: "apt" },
  { name: "Programming", icon: "prog" },
];

const BOOKS = [
  {
    id: 1,
    title: "Data Structures and Algorithms",
    author: "Mark Allen Weiss",
    isbn: "9780132576277",
    category: "DSA",
    badge: "DSA",
    theme: ["#0f172a", "#2563eb"],
    tags: ["DSA", "Programming"],
    rating: "4.8",
    reviews: "2.1k",
    search:
      "https://www.google.com/search?q=Data+Structures+and+Algorithms+Mark+Allen+Weiss",
  },
  {
    id: 2,
    title: "Operating System Concepts",
    author: "Silberschatz, Galvin, Gagne",
    isbn: "9781119800361",
    category: "Operating System",
    badge: "OS",
    theme: ["#064e3b", "#10b981"],
    tags: ["Operating System"],
    rating: "4.7",
    reviews: "1.5k",
    search:
      "https://www.google.com/search?q=Operating+System+Concepts+Silberschatz",
  },
  {
    id: 3,
    title: "Database System Concepts",
    author: "Silberschatz, Korth, Sudarshan",
    isbn: "9780078022159",
    category: "DBMS",
    badge: "DBMS",
    theme: ["#7c2d12", "#f97316"],
    tags: ["DBMS"],
    rating: "4.6",
    reviews: "1.3k",
    search:
      "https://www.google.com/search?q=Database+System+Concepts+Silberschatz+Korth",
  },
  {
    id: 4,
    title: "Computer Networking",
    author: "Andrew S. Tanenbaum",
    isbn: "9780132126953",
    category: "Computer Networks",
    badge: "NETWORKS",
    theme: ["#134e4a", "#14b8a6"],
    tags: ["Computer Networks"],
    rating: "4.6",
    reviews: "1.2k",
    search:
      "https://www.google.com/search?q=Computer+Networks+Andrew+Tanenbaum",
  },
  {
    id: 5,
    title: "Java: The Complete Reference",
    author: "Herbert Schildt",
    isbn: "9781260440218",
    category: "Programming",
    badge: "JAVA",
    theme: ["#7f1d1d", "#ef4444"],
    tags: ["Java", "Programming"],
    rating: "4.7",
    reviews: "980",
    search:
      "https://www.google.com/search?q=Java+The+Complete+Reference+Herbert+Schildt",
  },
  {
    id: 6,
    title: "HTML and CSS",
    author: "Jon Duckett",
    isbn: "9781118008188",
    category: "Web Development",
    badge: "HTML & CSS",
    theme: ["#1e1b4b", "#ec4899"],
    tags: ["HTML", "CSS"],
    rating: "4.8",
    reviews: "1.8k",
    search: "https://www.google.com/search?q=HTML+and+CSS+Jon+Duckett",
  },
  {
    id: 7,
    title: "JavaScript: The Definitive Guide",
    author: "David Flanagan",
    isbn: "9781491952023",
    category: "Web Development",
    badge: "JS",
    theme: ["#713f12", "#eab308"],
    tags: ["JavaScript"],
    rating: "4.7",
    reviews: "1.1k",
    search:
      "https://www.google.com/search?q=JavaScript+The+Definitive+Guide+David+Flanagan",
  },
  {
    id: 8,
    title: "Quantitative Aptitude",
    author: "R.S. Aggarwal",
    isbn: "9789352606760",
    category: "Aptitude",
    badge: "APTITUDE",
    theme: ["#4c1d95", "#8b5cf6"],
    tags: ["Aptitude", "Placement"],
    rating: "4.5",
    reviews: "2.4k",
    search:
      "https://www.google.com/search?q=Quantitative+Aptitude+RS+Aggarwal",
  },
];

/* ---------- Hero illustration (stacked books) ---------- */

function Sparkle({ x, y, s = 1, color = "#fbbf24" }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0-10Q0 0 10 0Q0 0 0 10Q0 0-10 0Q0 0 0-10Z"
      fill={color}
    />
  );
}

function StackBook({ x, y, w, h, color, dark, label }) {
  return (
    <g>
      {/* pages */}
      <rect
        x={x + w - 34}
        y={y + 3}
        width="34"
        height={h - 4}
        rx="3"
        fill="#f6f0e6"
      />
      <path
        d={`M${x + w - 28} ${y + 14}h24M${x + w - 28} ${y + 24}h24M${x + w - 28} ${y + 34}h24`}
        stroke="#d9cfc0"
        strokeWidth="1.2"
      />
      {/* cover */}
      <rect x={x} y={y} width={w - 28} height={h} rx="6" fill={color} />
      {/* spine */}
      <rect x={x} y={y} width="14" height={h} rx="6" fill={dark} />
      <rect x={x + 8} y={y} width="6" height={h} fill={dark} />
      <text
        x={x + 28}
        y={y + h / 2 + 7}
        fill="#fff"
        fontSize="20"
        fontWeight="800"
        fontFamily="inherit"
      >
        {label}
      </text>
    </g>
  );
}

function HeroIllustration() {
  return (
    <svg
      className="books-hero-art"
      viewBox="0 0 540 240"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="260" cy="226" rx="230" ry="10" fill="rgba(98,70,229,0.12)" />

      {/* books (bottom first) */}
      <StackBook x={80} y={178} w={340} h={46} color="#3d4fd9" dark="#2a37a8" label="Web Development" />
      <StackBook x={100} y={134} w={300} h={46} color="#f472a8" dark="#db2777" label="Aptitude" />
      <StackBook x={90} y={90} w={310} h={46} color="#f97316" dark="#c2410c" label="System Design" />
      <StackBook x={115} y={46} w={260} h={46} color="#6d4ae6" dark="#4c32b8" label="DSA" />

      {/* plant */}
      <path d="M32 228h44l-5-28H37z" fill="#fff" stroke="#e5e1f5" />
      <path d="M54 202C40 180 30 170 26 148c20 8 30 26 28 54z" fill="#2f9e6e" />
      <path d="M54 202c6-26 18-42 38-46-6 22-18 36-38 46z" fill="#4cc38a" />
      <path d="M54 202c-4-32-2-52 4-70 8 20 6 48-4 70z" fill="#1f7a55" />

      {/* bulb */}
      <g transform="translate(455 52)">
        <circle r="19" fill="#fde047" stroke="#f59e0b" strokeWidth="2" />
        <rect x="-8" y="18" width="16" height="10" rx="3" fill="#9ca3af" />
        <path
          d="M0-30v-8M-26-18l-6-6M26-18l6-6M-32 0h-8M32 0h8"
          stroke="#f59e0b"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      {/* sparkles */}
      <Sparkle x={52} y={70} s={1.3} />
      <Sparkle x={500} y={30} s={1.5} color="#fff" />
      <Sparkle x={430} y={130} s={0.8} color="#fff" />
      <Sparkle x={400} y={20} s={0.9} />

      {/* handwritten text */}
      <g
        transform="rotate(-12 480 150)"
        fill="#4c35c9"
        fontFamily="'Caveat','Segoe Script','Brush Script MT',cursive"
        fontStyle="italic"
        fontSize="24"
      >
        <text x="440" y="108">Read</text>
        <text x="448" y="138">Learn</text>
        <text x="458" y="168">Grow</text>
      </g>
    </svg>
  );
}

/* ---------- Book cover ---------- */

function BookCover({ book }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div
      className="book-cover"
      style={{ "--c1": book.theme[0], "--c2": book.theme[1] }}
    >
      {/* Designed front page (always behind) */}
      <div className="cover-art">
        <span className="cover-badge">{book.badge}</span>

        <div className="cover-title-box">
          <h4>{book.title}</h4>
          <div className="cover-line" />
        </div>

        <span className="cover-author">{book.author}</span>
      </div>

      {/* Real cover from Open Library (shows only if it loads) */}
      {!failed && (
        <img
          className={`cover-img ${loaded ? "show" : ""}`}
          src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg?default=false`}
          alt={book.title}
          loading="lazy"
          onLoad={(e) => {
            // ignore 1x1 placeholder images
            if (e.currentTarget.naturalWidth > 10) setLoaded(true);
            else setFailed(true);
          }}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

/* ---------- Page ---------- */

function Books() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [bookmarks, setBookmarks] = useState([]);

  const filteredBooks = useMemo(() => {
    const query = search.toLowerCase().trim();

    return BOOKS.filter((book) => {
      const matchesCategory =
        activeCategory === "All" ||
        book.category === activeCategory ||
        book.tags.includes(activeCategory);

      const matchesSearch =
        !query ||
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query) ||
        book.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const toggleBookmark = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const openBook = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const resetFilters = () => {
    setSearch("");
    setActiveCategory("All");
  };

  return (
    <section className="books-page">
      {/* Hero */}
      <div className="books-header">
        <div className="books-header-text">
          <div className="books-eyebrow">LEARNING RESOURCES</div>

          <h1>
            Study Books <span>Library</span>
          </h1>

          <p>
            Explore the best books and learning resources for your placement
            preparation and skill development.
          </p>
        </div>

        <HeroIllustration />
      </div>

      {/* Search */}
      <div className="books-search">
        <Icon name="search" size={20} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search books by title, author or subject..."
        />
      </div>

      {/* Category chips */}
      <div className="books-categories">
        {CATEGORIES.map((category) => (
          <button
            type="button"
            key={category.name}
            className={activeCategory === category.name ? "active" : ""}
            onClick={() => setActiveCategory(category.name)}
          >
            <Icon name={category.icon} size={17} />
            {category.name}
          </button>
        ))}
      </div>

      {/* Heading */}
      <div className="popular-books-heading">
        <div>
          <h2>Popular Books</h2>
          <p>Most recommended books for placement preparation.</p>
        </div>

        <button type="button" className="view-all-btn" onClick={resetFilters}>
          View All <span aria-hidden="true">→</span>
        </button>
      </div>

      {/* Grid */}
      <div className="books-grid">
        {filteredBooks.map((book) => {
          const saved = bookmarks.includes(book.id);

          return (
            <article className="book-card" key={book.id}>
              <div className="book-main">
                <BookCover book={book} />

                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p className="book-author">{book.author}</p>

                  <div className="book-meta">
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
                  </div>
                </div>
              </div>

              <div className="book-actions">
                <button
                  type="button"
                  className="read-book-btn"
                  onClick={() => openBook(book.search)}
                >
                  <Icon name="book" size={18} />
                  Read Now
                </button>

                <button
                  type="button"
                  className={`bookmark-btn ${saved ? "saved" : ""}`}
                  onClick={() => toggleBookmark(book.id)}
                  aria-label={saved ? "Remove bookmark" : "Bookmark book"}
                >
                  <HeartIcon filled={saved} />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {filteredBooks.length === 0 && (
        <div className="books-empty">
          <div>📚</div>
          <h3>No books found</h3>
          <p>Try another book name, author or category.</p>
          <button type="button" onClick={resetFilters}>
            Show All Books
          </button>
        </div>
      )}
    </section>
  );
}

export default Books;
