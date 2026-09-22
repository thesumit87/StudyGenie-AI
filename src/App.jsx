import { useState } from "react";
import "./App.css";

import AIAssistant from "./AIAssistant";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Notes from "./Notes";
import Profile from "./Profile";
import Progress from "./Progress";
import Quiz from "./Quiz";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  if (showAI) {
    return <AIAssistant onBack={() => setShowAI(false)} />;
  }

  if (showNotes) {
    return <Notes onBack={() => setShowNotes(false)} />;
  }

  if (showQuiz) {
    return <Quiz onBack={() => setShowQuiz(false)} />;
  }

  if (showProgress) {
    return <Progress onBack={() => setShowProgress(false)} />;
  }

  if (showProfile) {
    return (
      <Profile
        onBack={() => setShowProfile(false)}
        onLogout={() => {
          setShowProfile(false);
          setShowDashboard(false);
          setShowLogin(false);
        }}
      />
    );
  }

  if (showDashboard) {
    return (
      <Dashboard
        onLogout={() => {
          setShowDashboard(false);
          setShowLogin(false);
        }}
        onOpenAI={() => setShowAI(true)}
        onOpenNotes={() => setShowNotes(true)}
        onOpenQuiz={() => setShowQuiz(true)}
        onOpenProgress={() => setShowProgress(true)}
        onOpenProfile={() => setShowProfile(true)}
      />
    );
  }

  if (showLogin) {
    return (
      <Login
        onBack={() => setShowLogin(false)}
        onLogin={() => {
          setShowLogin(false);
          setShowDashboard(true);
        }}
      />
    );
  }

  return (
    <div className="app">

      {/* Navbar */}

      <nav className="navbar">

        <div className="logo">
          <div className="logo-mark">◆</div>
          <span>
            StudyGenie <b>AI</b>
          </span>
        </div>

        <div className="nav-links">

          <button
            className="nav-link active"
            onClick={() => scrollTo("home")}
          >
            Home
          </button>

          <button
            className="nav-link"
            onClick={() => scrollTo("features")}
          >
            Features
          </button>

          <button
            className="nav-link"
            onClick={() => scrollTo("about")}
          >
            About
          </button>

          <button
            className="login-btn"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>

        </div>

      </nav>

      {/* Hero */}

      <main className="hero" id="home">

        <div className="hero-content">

          <div className="hero-label">
            WELCOME TO STUDYGENIE AI
          </div>

          <h1>
            Your Personal
            <br />
            <span>Study Companion</span>
          </h1>

          <p>
            Make your learning smarter, faster, and easier with AI.
            <br />
            Take notes, solve doubts, practice quizzes and track your progress
            all in one place.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => setShowLogin(true)}
            >
              Get Started
            </button>

            <button
              className="secondary-btn"
              onClick={() => scrollTo("features")}
            >
              Explore Features
            </button>

          </div>

        </div>

        {/* Hero Visual */}

        <div className="hero-visual">

          <div className="soft-circle"></div>

          <div className="floating-card ai-float">
            <div className="float-icon purple-icon">✦</div>
            <div>
              <strong>AI Assistant</strong>
              <div className="fake-lines">
                <i></i>
                <i></i>
              </div>
            </div>
          </div>

          <div className="floating-card notes-float">
            <div className="float-icon blue-icon">▤</div>
            <div>
              <strong>Notes</strong>
              <div className="fake-lines">
                <i></i>
                <i></i>
                <i></i>
              </div>
            </div>
          </div>

          <div className="floating-card quiz-float">
            <div className="float-icon pink-icon">□</div>
            <div>
              <strong>Quiz</strong>
              <div className="fake-lines">
                <i></i>
                <i></i>
              </div>
            </div>
          </div>

          <div className="student">

            <div className="plant">
              🌿
            </div>

            <div className="student-head">
              👨🏻
            </div>

            <div className="student-body">
              <div className="shirt"></div>
              <div className="arm left-arm"></div>
              <div className="arm right-arm"></div>
            </div>

            <div className="laptop">
              <div className="laptop-screen">
                <span>•</span>
              </div>
              <div className="laptop-base"></div>
            </div>

            <div className="books">
              <span></span>
              <span></span>
              <span></span>
            </div>

          </div>

          <div className="floating-card progress-float">
            <strong>Your Progress</strong>

            <div className="mini-chart">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </div>
          </div>

          <div className="desk-line"></div>

        </div>

      </main>

      {/* Stats */}

      <section className="stats-section">

        <div className="stat">
          <strong>10K+</strong>
          <span>Students</span>
        </div>

        <div className="stat">
          <strong>5K+</strong>
          <span>Notes Created</span>
        </div>

        <div className="stat">
          <strong>1K+</strong>
          <span>Quizzes Taken</span>
        </div>

        <div className="stat">
          <strong>95%</strong>
          <span>Positive Feedback</span>
        </div>

      </section>

      <button
        className="scroll-down"
        onClick={() => scrollTo("features")}
      >
        ↓
      </button>

      {/* Features */}

      <section className="features" id="features">

        <div className="section-label">
          WHAT WE OFFER
        </div>

        <h2>Powerful Features for Smarter Learning</h2>

        <p className="section-subtitle">
          Everything you need to study, organize and grow — in one place.
        </p>

        <div className="feature-grid">

          <div
            className="feature-card"
            onClick={() => setShowAI(true)}
          >
            <div className="feature-icon purple">
              ✦
            </div>
            <h3>AI Assistant</h3>
            <p>
              Get instant answers to your doubts with your AI-powered study assistant.
            </p>
          </div>

          <div
            className="feature-card"
            onClick={() => setShowNotes(true)}
          >
            <div className="feature-icon blue">
              ▤
            </div>
            <h3>Smart Notes</h3>
            <p>
              Create, organize and manage your study notes easily.
            </p>
          </div>

          <div
            className="feature-card"
            onClick={() => setShowQuiz(true)}
          >
            <div className="feature-icon green">
              ✓
            </div>
            <h3>Quizzes</h3>
            <p>
              Practice with AI generated quizzes to test your knowledge.
            </p>
          </div>

          <div
            className="feature-card"
            onClick={() => setShowProgress(true)}
          >
            <div className="feature-icon orange">
              ▥
            </div>
            <h3>Progress Tracking</h3>
            <p>
              Track your learning progress and stay consistent.
            </p>
          </div>

          <div
            className="feature-card"
            onClick={() => setShowNotes(true)}
          >
            <div className="feature-icon pink">
              ▮
            </div>
            <h3>Study Materials</h3>
            <p>
              Manage your study materials and resources in one place.
            </p>
          </div>

          <div
            className="feature-card"
            onClick={() => setShowProfile(true)}
          >
            <div className="feature-icon violet">
              ♙
            </div>
            <h3>User Profile</h3>
            <p>
              Keep your profile and learning preferences in one place.
            </p>
          </div>

        </div>

        <div className="quote-box">
          <strong>
            “Study smart, not hard with StudyGenie AI.”
          </strong>
          <span>— Your Learning, Our Priority</span>
        </div>

      </section>

      {/* About */}

      <section className="about-section" id="about">

        <div className="about-content">

          <div className="section-label">
            ABOUT US
          </div>

          <h2>
            Your Smart Partner for Better Learning
          </h2>

          <p>
            StudyGenie AI is designed to make studying simple, organized
            and effective. From understanding difficult topics to practicing
            quizzes and tracking your progress, everything is available in
            one place.
          </p>

          <button
            className="primary-btn"
            onClick={() => setShowLogin(true)}
          >
            Start Learning
          </button>

        </div>

      </section>

      <footer>
        © 2026 StudyGenie AI • Smart Learning for Students
      </footer>

    </div>
  );
}

export default App;