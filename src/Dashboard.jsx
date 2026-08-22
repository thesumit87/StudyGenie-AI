import { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard({
  onLogout,
  onOpenAI,
  onOpenNotes,
  onOpenQuiz,
  onOpenProgress,
  onOpenProfile,
}) {
  const [notes, setNotes] = useState([]);
  const [quizHistory, setQuizHistory] = useState([]);
  const [profile, setProfile] = useState({
    name: "Student",
    email: "student@example.com",
    learningMode: "Student",
    subjects: [],
  });

  const [photo, setPhoto] = useState("");

  /* ============================= */
  /* Load Dashboard Data */
  /* ============================= */

  useEffect(() => {
    loadDashboardData();

    window.addEventListener(
      "studygenie-update",
      loadDashboardData
    );

    window.addEventListener(
      "storage",
      loadDashboardData
    );

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
    /* Notes */

    const savedNotes =
      localStorage.getItem("studygenieNotes");

    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch {
        setNotes([]);
      }
    } else {
      setNotes([]);
    }

    /* Quiz History */

    const savedHistory =
      localStorage.getItem("quizHistory");

    if (savedHistory) {
      try {
        setQuizHistory(JSON.parse(savedHistory));
      } catch {
        setQuizHistory([]);
      }
    } else {
      setQuizHistory([]);
    }

    /* Profile */

    const savedProfile =
      localStorage.getItem(
        "studygenieProfile"
      );

    if (savedProfile) {
      try {
        setProfile(
          JSON.parse(savedProfile)
        );
      } catch {
        setProfile({
          name: "Student",
          email: "student@example.com",
          learningMode: "Student",
          subjects: [],
        });
      }
    }

    /* Photo */

    setPhoto(
      localStorage.getItem(
        "profilePhoto"
      ) || ""
    );
  };

  /* ============================= */
  /* Statistics */
  /* ============================= */

  const topicsStudied = notes.length;

  const quizzesCompleted =
    quizHistory.length;

  const averageScore =
    quizzesCompleted > 0
      ? Math.round(
          quizHistory.reduce(
            (total, quiz) =>
              total +
              Number(
                quiz.percentage || 0
              ),
            0
          ) / quizzesCompleted
        )
      : 0;

  const bestScore =
    quizzesCompleted > 0
      ? Math.max(
          ...quizHistory.map(
            (quiz) =>
              Number(
                quiz.percentage || 0
              )
          )
        )
      : 0;

  /* ============================= */
  /* Learning Streak */
  /* ============================= */

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

    const parts =
      quiz.date.split("/");

    if (parts.length !== 3) {
      return null;
    }

    const month =
      Number(parts[0]);

    const day =
      Number(parts[1]);

    const year =
      Number(parts[2]);

    if (
      !month ||
      !day ||
      !year
    ) {
      return null;
    }

    const date = new Date(
      year,
      month - 1,
      day
    );

    return getDateKey(date);
  };

  const activityDates = [
    ...new Set(
      quizHistory
        .map(getQuizDateKey)
        .filter(Boolean)
    ),
  ];

  const calculateStreak = () => {
    if (
      activityDates.length === 0
    ) {
      return 0;
    }

    const today = new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    const todayKey =
      getDateKey(today);

    const yesterday =
      new Date(today);

    yesterday.setDate(
      yesterday.getDate() - 1
    );

    const yesterdayKey =
      getDateKey(yesterday);

    if (
      !activityDates.includes(
        todayKey
      ) &&
      !activityDates.includes(
        yesterdayKey
      )
    ) {
      return 0;
    }

    let streak = 0;

    const currentDate =
      new Date(today);

    if (
      !activityDates.includes(
        todayKey
      )
    ) {
      currentDate.setDate(
        currentDate.getDate() - 1
      );
    }

    while (true) {
      const key =
        getDateKey(
          currentDate
        );

      if (
        !activityDates.includes(key)
      ) {
        break;
      }

      streak++;

      currentDate.setDate(
        currentDate.getDate() - 1
      );
    }

    return streak;
  };

  const learningStreak =
    calculateStreak();

  /* ============================= */
  /* Latest Activity */
  /* ============================= */

  const latestQuiz =
    quizHistory.length > 0
      ? quizHistory[0]
      : null;

  const latestNote =
    notes.length > 0
      ? notes[0]
      : null;

  return (
    <div className="dashboard">

      {/* ============================= */}
      {/* Sidebar */}
      {/* ============================= */}

      <aside className="sidebar">

        <div className="dashboard-logo">
          🎓 StudyGenie
        </div>

        <div className="menu">

          <button
            type="button"
            className="active"
          >
            🏠 Dashboard
          </button>

          <button
            type="button"
            onClick={onOpenAI}
          >
            🤖 AI Assistant
          </button>

          <button
            type="button"
            onClick={onOpenNotes}
          >
            📄 My Notes
          </button>

          <button
            type="button"
            onClick={onOpenQuiz}
          >
            📝 Quiz
          </button>

          <button
            type="button"
            onClick={onOpenProgress}
          >
            📊 Progress
          </button>

          <button
            type="button"
            onClick={onOpenProfile}
          >
            👤 Profile
          </button>

        </div>

        <button
          type="button"
          className="logout-btn"
          onClick={onLogout}
        >
          🚪 Logout
        </button>

      </aside>

      {/* ============================= */}
      {/* Main */}
      {/* ============================= */}

      <main className="dashboard-main">

        {/* Header */}

        <header className="dashboard-header">

          <div>

            <h1>
              Hello, {profile.name} 👋
            </h1>

            <p>
              Let's continue your
              learning journey.
            </p>

          </div>

          <div
            className="profile"
            onClick={onOpenProfile}
            style={{
              cursor: "pointer",
            }}
          >

            {photo ? (

              <img
                src={photo}
                alt="Profile"
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />

            ) : (

              <span>👤</span>

            )}

            <div>

              <strong>
                {profile.name}
              </strong>

              <small>
                {profile.learningMode}
              </small>

            </div>

          </div>

        </header>

        {/* ============================= */}
        {/* Stats */}
        {/* ============================= */}

        <section className="stats">

          <div className="stat-card">

            <span>📚</span>

            <div>

              <h3>
                {topicsStudied}
              </h3>

              <p>
                Topics Studied
              </p>

            </div>

          </div>

          <div className="stat-card">

            <span>📝</span>

            <div>

              <h3>
                {quizzesCompleted}
              </h3>

              <p>
                Quizzes Completed
              </p>

            </div>

          </div>

          <div className="stat-card">

            <span>⭐</span>

            <div>

              <h3>
                {averageScore}%
              </h3>

              <p>
                Average Score
              </p>

            </div>

          </div>

          <div className="stat-card">

            <span>🔥</span>

            <div>

              <h3>
                {learningStreak}
              </h3>

              <p>
                Day Learning Streak
              </p>

            </div>

          </div>

        </section>

        {/* ============================= */}
        {/* AI Banner */}
        {/* ============================= */}

        <section className="ai-box">

          <div>

            <span className="ai-icon">
              🤖
            </span>

            <div>

              <h2>
                Need help with
                your studies?
              </h2>

              <p>
                Ask StudyGenie AI
                anything about your
                subjects.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={onOpenAI}
          >
            Ask AI →
          </button>

        </section>

        {/* ============================= */}
        {/* Performance Summary */}
        {/* ============================= */}

        <section className="dashboard-section">

          <div className="section-title">

            <h2>
              Your Learning Summary
            </h2>

            <p>
              A quick look at your
              performance
            </p>

          </div>

          <div className="quick-grid">

            <div className="quick-card">

              <span>🏆</span>

              <h3>
                Best Score
              </h3>

              <p>
                Your highest quiz
                score so far.
              </p>

              <strong>
                {bestScore}%
              </strong>

            </div>

            <div className="quick-card">

              <span>🔥</span>

              <h3>
                Current Streak
              </h3>

              <p>
                Keep learning every
                day to increase it.
              </p>

              <strong>
                {learningStreak} Days
              </strong>

            </div>

            <div className="quick-card">

              <span>📄</span>

              <h3>
                Study Notes
              </h3>

              <p>
                Your saved study
                materials.
              </p>

              <strong>
                {notes.length} Notes
              </strong>

            </div>

            <div className="quick-card">

              <span>🎯</span>

              <h3>
                Average
              </h3>

              <p>
                Your overall quiz
                performance.
              </p>

              <strong>
                {averageScore}%
              </strong>

            </div>

          </div>

        </section>

        {/* ============================= */}
        {/* Quick Access */}
        {/* ============================= */}

        <section className="dashboard-section">

          <div className="section-title">

            <h2>
              Quick Access
            </h2>

            <p>
              Choose what you want
              to do
            </p>

          </div>

          <div className="quick-grid">

            <div className="quick-card">

              <span>🤖</span>

              <h3>
                AI Assistant
              </h3>

              <p>
                Ask questions and
                get instant
                explanations.
              </p>

              <button
                type="button"
                onClick={onOpenAI}
              >
                Open →
              </button>

            </div>

            <div className="quick-card">

              <span>📄</span>

              <h3>
                Study Notes
              </h3>

              <p>
                Read and manage your
                study materials.
              </p>

              <button
                type="button"
                onClick={onOpenNotes}
              >
                Open →
              </button>

            </div>

            <div className="quick-card">

              <span>📝</span>

              <h3>
                Take Quiz
              </h3>

              <p>
                Test your knowledge
                with practice
                questions.
              </p>

              <button
                type="button"
                onClick={onOpenQuiz}
              >
                Start →
              </button>

            </div>

            <div className="quick-card">

              <span>📊</span>

              <h3>
                My Progress
              </h3>

              <p>
                Check your learning
                performance.
              </p>

              <button
                type="button"
                onClick={onOpenProgress}
              >
                View →
              </button>

            </div>

          </div>

        </section>

        {/* ============================= */}
        {/* Recent Activity */}
        {/* ============================= */}

        <section className="recent">

          <div className="section-title">

            <h2>
              Recent Activity
            </h2>

            <p>
              Your latest learning
              activities
            </p>

          </div>

          {/* Quiz */}

          {latestQuiz ? (

            <div className="activity">

              <span>📝</span>

              <div>

                <strong>
                  {latestQuiz.quizName}
                </strong>

                <p>
                  Score:{" "}
                  {latestQuiz.percentage}%
                  {latestQuiz.date
                    ? ` • ${latestQuiz.date}`
                    : ""}
                </p>

              </div>

              <span className="completed">
                Completed
              </span>

            </div>

          ) : (

            <div className="activity">

              <span>📝</span>

              <div>

                <strong>
                  No quiz completed yet
                </strong>

                <p>
                  Start your first quiz
                  to see activity here.
                </p>

              </div>

            </div>

          )}

          {/* Note */}

          {latestNote ? (

            <div className="activity">

              <span>📘</span>

              <div>

                <strong>
                  {latestNote.title}
                </strong>

                <p>
                  {latestNote.subject}
                </p>

              </div>

              <span className="completed">
                Saved
              </span>

            </div>

          ) : (

            <div className="activity">

              <span>📘</span>

              <div>

                <strong>
                  No notes added yet
                </strong>

                <p>
                  Add your first study
                  note.
                </p>

              </div>

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default Dashboard;