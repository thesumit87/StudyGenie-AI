import { useEffect, useState } from "react";
import "./Dashboard.css";

import AIAssistant from "./AIAssistant";
import Notes from "./Notes";
import Profile from "./Profile";
import Progress from "./Progress";
import Quiz from "./Quiz";

function Dashboard({ onLogout }) {
  const [activePage, setActivePage] = useState("dashboard");

  const [notes, setNotes] = useState([]);
  const [quizHistory, setQuizHistory] = useState([]);

  const [profile, setProfile] = useState({
    name: "Student",
    email: "student@example.com",
    learningMode: "Student",
    subjects: [],
  });

  const [photo, setPhoto] = useState("");

  useEffect(() => {
    loadDashboardData();

    window.addEventListener("studygenie-update", loadDashboardData);
    window.addEventListener("storage", loadDashboardData);

    return () => {
      window.removeEventListener(
        "studygenie-update",
        loadDashboardData
      );

      window.removeEventListener(
        "storage",
        loadDashboardData
      );
    };
  }, []);

  const loadDashboardData = () => {
    const savedNotes = localStorage.getItem("studygenieNotes");

    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch {
        setNotes([]);
      }
    } else {
      setNotes([]);
    }

    const savedHistory = localStorage.getItem("quizHistory");

    if (savedHistory) {
      try {
        setQuizHistory(JSON.parse(savedHistory));
      } catch {
        setQuizHistory([]);
      }
    } else {
      setQuizHistory([]);
    }

    const savedProfile =
      localStorage.getItem("studygenieProfile");

    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch {
        setProfile({
          name: "Student",
          email: "student@example.com",
          learningMode: "Student",
          subjects: [],
        });
      }
    }

    setPhoto(localStorage.getItem("profilePhoto") || "");
  };

  const topicsStudied = notes.length;
  const quizzesCompleted = quizHistory.length;

  const averageScore =
    quizzesCompleted > 0
      ? Math.round(
          quizHistory.reduce(
            (total, quiz) =>
              total + Number(quiz.percentage || 0),
            0
          ) / quizzesCompleted
        )
      : 0;

  const bestScore =
    quizzesCompleted > 0
      ? Math.max(
          ...quizHistory.map((quiz) =>
            Number(quiz.percentage || 0)
          )
        )
      : 0;

  const getDateKey = (date) => {
    return `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;
  };

  const getQuizDateKey = (quiz) => {
    if (!quiz.date) {
      return null;
    }

    const parts = quiz.date.split("/");

    if (parts.length !== 3) {
      return null;
    }

    const month = Number(parts[0]);
    const day = Number(parts[1]);
    const year = Number(parts[2]);

    if (!month || !day || !year) {
      return null;
    }

    return getDateKey(
      new Date(year, month - 1, day)
    );
  };

  const activityDates = [
    ...new Set(
      quizHistory
        .map(getQuizDateKey)
        .filter(Boolean)
    ),
  ];

  const calculateStreak = () => {
    if (activityDates.length === 0) {
      return 0;
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const todayKey = getDateKey(today);

    const yesterday = new Date(today);

    yesterday.setDate(
      yesterday.getDate() - 1
    );

    const yesterdayKey = getDateKey(yesterday);

    if (
      !activityDates.includes(todayKey) &&
      !activityDates.includes(yesterdayKey)
    ) {
      return 0;
    }

    let streak = 0;

    const currentDate = new Date(today);

    if (!activityDates.includes(todayKey)) {
      currentDate.setDate(
        currentDate.getDate() - 1
      );
    }

    while (true) {
      const key = getDateKey(currentDate);

      if (!activityDates.includes(key)) {
        break;
      }

      streak++;

      currentDate.setDate(
        currentDate.getDate() - 1
      );
    }

    return streak;
  };

  const learningStreak = calculateStreak();

  const latestQuiz =
    quizHistory.length > 0
      ? quizHistory[0]
      : null;

  const latestNote =
    notes.length > 0
      ? notes[0]
      : null;

  const navigate = (page) => {
    setActivePage(page);
  };

  const renderPageContent = () => {
    if (activePage === "ai") {
      return <AIAssistant />;
    }

    if (activePage === "notes") {
      return <Notes />;
    }

    if (activePage === "quiz") {
      return <Quiz />;
    }

    if (activePage === "progress") {
      return <Progress />;
    }

    if (activePage === "profile") {
      return (
        <Profile
          onLogout={onLogout}
        />
      );
    }

    if (activePage === "books") {
      return (
        <section className="dashboard-content">
          <div className="welcome-section">
            <div>
              <h1>Books</h1>
              <p>
                Your study books and learning resources.
              </p>
            </div>
          </div>

          <div className="empty-activity">
            <span>📚</span>
            <strong>Books Coming Soon</strong>
            <p>
              StudyGenie books section will be available soon.
            </p>
          </div>
        </section>
      );
    }

    return (
      <div className="dashboard-content">

        <section className="welcome-section">

          <div>
            <h1>
              Welcome Back, {profile.name}!
            </h1>

            <p>
              Keep learning, keep growing. You can do it! 🚀
            </p>
          </div>

        </section>

        <section className="stats">

          <div className="stat-card">

            <div className="stat-icon purple">
              ▣
            </div>

            <div>
              <h3>{topicsStudied}</h3>
              <p>Notes Created</p>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon green">
              ▤
            </div>

            <div>
              <h3>{quizzesCompleted}</h3>
              <p>Quizzes Taken</p>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon blue">
              ▫
            </div>

            <div>
              <h3>
                {profile.subjects?.length || 0}
              </h3>

              <p>Subjects</p>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon orange">
              ★
            </div>

            <div>
              <h3>{averageScore}%</h3>
              <p>Overall Progress</p>
            </div>

          </div>

        </section>

        <section className="dashboard-grid">

          <div className="activity-card">

            <div className="card-heading">

              <div>
                <h2>Recent Activity</h2>
                <p>
                  Your latest learning activities
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("progress")}
              >
                View All
              </button>

            </div>

            <div className="activity-list">

              {latestNote && (
                <div className="activity-item">

                  <div className="activity-icon green">
                    ▣
                  </div>

                  <div className="activity-info">

                    <strong>
                      Created a new note
                    </strong>

                    <span>
                      {latestNote.title}
                    </span>

                  </div>

                  <small>
                    Recently
                  </small>

                </div>
              )}

              {latestQuiz && (
                <div className="activity-item">

                  <div className="activity-icon blue">
                    ✓
                  </div>

                  <div className="activity-info">

                    <strong>
                      Completed a quiz
                    </strong>

                    <span>
                      {latestQuiz.quizName}
                    </span>

                  </div>

                  <small>
                    {latestQuiz.percentage}%
                  </small>

                </div>
              )}

              {!latestNote && !latestQuiz && (
                <div className="empty-activity">

                  <span>📚</span>

                  <strong>
                    No activity yet
                  </strong>

                  <p>
                    Start studying to see your activity here.
                  </p>

                </div>
              )}

            </div>

          </div>

          <div className="study-progress-card">

            <div className="card-heading">

              <div>
                <h2>Study Progress</h2>

                <p>
                  Your overall performance
                </p>
              </div>

            </div>

            <div className="progress-circle">

              <div className="circle-inner">

                <strong>
                  {averageScore}%
                </strong>

                <span>
                  Progress
                </span>

              </div>

            </div>

            <div className="progress-details">

              <div>

                <span>
                  <i className="dot purple"></i>
                  Notes
                </span>

                <strong>
                  {notes.length}
                </strong>

              </div>

              <div>

                <span>
                  <i className="dot green"></i>
                  Quizzes
                </span>

                <strong>
                  {quizzesCompleted}
                </strong>

              </div>

              <div>

                <span>
                  <i className="dot blue"></i>
                  Best Score
                </span>

                <strong>
                  {bestScore}%
                </strong>

              </div>

            </div>

          </div>

        </section>

        <section className="ai-box">

          <div className="ai-box-icon">
            ✦
          </div>

          <div className="ai-box-text">

            <h3>
              Need help with your studies?
            </h3>

            <p>
              Ask your AI Assistant anything.
            </p>

          </div>

          <button
            type="button"
            onClick={() => navigate("ai")}
          >
            Go to AI Assistant
            <span>→</span>
          </button>

        </section>

      </div>
    );
  };

  return (
    <div className="dashboard">

      <aside className="sidebar">

        <div className="dashboard-logo">

          <span className="logo-icon">
            ◆
          </span>

          <span>
            StudyGenie <b>AI</b>
          </span>

        </div>

        <nav className="menu">

          <button
            type="button"
            className={
              activePage === "dashboard"
                ? "active"
                : ""
            }
            onClick={() => navigate("dashboard")}
          >
            <span>⌂</span>
            Dashboard
          </button>

          <button
            type="button"
            className={
              activePage === "ai"
                ? "active"
                : ""
            }
            onClick={() => navigate("ai")}
          >
            <span>✧</span>
            AI Assistant
          </button>

          <button
            type="button"
            className={
              activePage === "notes"
                ? "active"
                : ""
            }
            onClick={() => navigate("notes")}
          >
            <span>▤</span>
            Notes
          </button>

          <button
            type="button"
            className={
              activePage === "quiz"
                ? "active"
                : ""
            }
            onClick={() => navigate("quiz")}
          >
            <span>□</span>
            Quiz
          </button>

          <button
            type="button"
            className={
              activePage === "progress"
                ? "active"
                : ""
            }
            onClick={() => navigate("progress")}
          >
            <span>⌁</span>
            Progress
          </button>

          <button
            type="button"
            className={
              activePage === "books"
                ? "active"
                : ""
            }
            onClick={() => navigate("books")}
          >
            <span>▥</span>
            Books
          </button>

          <button
            type="button"
            className={
              activePage === "profile"
                ? "active"
                : ""
            }
            onClick={() => navigate("profile")}
          >
            <span>♙</span>
            Profile
          </button>

        </nav>

        <button
          type="button"
          className="logout-btn"
          onClick={onLogout}
        >
          <span>↪</span>
          Logout
        </button>

      </aside>

      <main className="dashboard-main">

        <header className="dashboard-header">

          <div className="search-box">

            <span>⌕</span>

            <input
              type="text"
              placeholder="Search anything..."
            />

          </div>

          <div
            className="profile"
            onClick={() => navigate("profile")}
          >

            <div className="profile-photo">

              {photo ? (
                <img
                  src={photo}
                  alt="Profile"
                />
              ) : (
                <span>👤</span>
              )}

            </div>

            <div className="profile-text">

              <strong>
                Hi, {profile.name}
              </strong>

              <small>
                {profile.learningMode}
              </small>

            </div>

            <span className="profile-dot">
              ●
            </span>

          </div>

        </header>

        {renderPageContent()}

      </main>

    </div>
  );
}

export default Dashboard;
