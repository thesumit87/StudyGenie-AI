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

  // AI Assistant
  if (showAI) {
    return (
      <AIAssistant
        onBack={() => setShowAI(false)}
      />
    );
  }

  // Notes
  if (showNotes) {
    return (
      <Notes
        onBack={() => setShowNotes(false)}
      />
    );
  }

  // Quiz
  if (showQuiz) {
    return (
      <Quiz
        onBack={() => setShowQuiz(false)}
      />
    );
  }

  // Progress
  if (showProgress) {
    return (
      <Progress
        onBack={() => setShowProgress(false)}
      />
    );
  }

  // Profile
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

  // Dashboard
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

  // Login
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

  // Home
  return (
    <div className="app">

      {/* Navbar */}

      <nav className="navbar">

        <div className="logo">
          <span>🎓</span> StudyGenie AI
        </div>

        <div className="nav-links">

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            Home
          </a>

          <a
            href="#features"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("features")
                ?.scrollIntoView({
                  behavior: "smooth",
                });
            }}
          >
            Features
          </a>

          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("about")
                ?.scrollIntoView({
                  behavior: "smooth",
                });
            }}
          >
            About
          </a>

          <button
            className="login-btn"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>

        </div>

      </nav>

      {/* Hero */}

      <main className="hero">

        <div className="hero-content">

          <div className="badge">
            ✨ AI-Powered Learning Assistant
          </div>

          <h1>
            Study Smarter.
            <br />
            <span>Learn Better.</span>
          </h1>

          <p>
            StudyGenie AI helps students understand difficult topics,
            summarize notes, generate quizzes and prepare for exams.
          </p>

          <div className="buttons">

            <button
              className="primary-btn"
              onClick={() => setShowLogin(true)}
            >
              Start Learning
            </button>

            <button
              className="secondary-btn"
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              Explore Features
            </button>

          </div>

        </div>

        {/* AI Card */}

        <div className="hero-card">

          <div className="card-header">

            <span>🤖</span>

            <div>
              <h3>StudyGenie AI</h3>
              <p>Your personal AI tutor</p>
            </div>

          </div>

          <div className="chat">

            <div className="message user-message">
              Explain Operating System in simple words.
            </div>

            <div className="message ai-message">
              Sure! 😊 An Operating System is software that manages
              your computer's hardware and allows applications to run.
            </div>

          </div>

          <div className="input-box">

            <span>Ask anything...</span>

            <button>➤</button>

          </div>

        </div>

      </main>

      {/* Features */}

      <section
        className="features"
        id="features"
      >

        <h2>
          Everything You Need to Study Better
        </h2>

        <div className="feature-grid">

          {/* Smart Summaries */}

          <div
            className="feature-card"
            onClick={() => setShowNotes(true)}
          >

            <div className="icon">
              📄
            </div>

            <h3>
              Smart Summaries
            </h3>

            <p>
              Convert lengthy notes into short and easy summaries.
            </p>

          </div>

          {/* AI Assistant */}

          <div
            className="feature-card"
            onClick={() => setShowAI(true)}
          >

            <div className="icon">
              🧠
            </div>

            <h3>
              AI Study Assistant
            </h3>

            <p>
              Ask questions and get simple explanations instantly.
            </p>

          </div>

          {/* Quiz */}

          <div
            className="feature-card"
            onClick={() => setShowQuiz(true)}
          >

            <div className="icon">
              📝
            </div>

            <h3>
              AI Quiz Generator
            </h3>

            <p>
              Generate practice questions and test your knowledge.
            </p>

          </div>

          {/* Progress */}

          <div
            className="feature-card"
            onClick={() => setShowProgress(true)}
          >

            <div className="icon">
              📊
            </div>

            <h3>
              Progress Tracking
            </h3>

            <p>
              Track your learning progress and improve your preparation.
            </p>

          </div>

        </div>

      </section>

      {/* About */}

      <section
        className="about-section"
        id="about"
      >

        <div className="about-content">

          <h2>
            About StudyGenie AI
          </h2>

          <p>
            StudyGenie AI is a smart learning platform designed to make
            studying easier and more effective for students. It provides
            useful features like an AI Study Assistant, study notes,
            quizzes, and progress tracking in one place.
          </p>

          <p>
            Students can use StudyGenie AI to understand difficult topics,
            manage their study materials, practice through quizzes, and
            track their learning progress.
          </p>

        </div>

      </section>

      {/* Footer */}

      <footer>

        <p>
          © 2026 StudyGenie AI • Smart Learning for Students
        </p>

      </footer>

    </div>
  );
}

export default App;