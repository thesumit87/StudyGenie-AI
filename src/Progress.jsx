import { useState } from "react";
import "./Progress.css";

function Progress() {
  const [quizHistory] = useState(() => {
    const saved = localStorage.getItem("quizHistory");

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }

    return [];
  });

  const [notes] = useState(() => {
    const saved = localStorage.getItem("studygenieNotes");

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }

    return [];
  });

  const quizCount = quizHistory.length;

  const averageScore =
    quizCount > 0
      ? Math.round(
          quizHistory.reduce(
            (total, quiz) => total + Number(quiz.percentage || 0),
            0
          ) / quizCount
        )
      : 0;

  const getDateKey = (date) => {
    return `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const getQuizDateKey = (quiz) => {
    if (!quiz.date) return null;

    const parts = quiz.date.split("/");

    if (parts.length !== 3) return null;

    const month = Number(parts[0]);
    const day = Number(parts[1]);
    const year = Number(parts[2]);

    if (!month || !day || !year) return null;

    return getDateKey(new Date(year, month - 1, day));
  };

  const activityDates = [
    ...new Set(
      quizHistory
        .map((quiz) => getQuizDateKey(quiz))
        .filter(Boolean)
    ),
  ];

  const calculateStreak = () => {
    if (activityDates.length === 0) return 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayKey = getDateKey(today);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

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
      currentDate.setDate(currentDate.getDate() - 1);
    }

    while (true) {
      const key = getDateKey(currentDate);

      if (!activityDates.includes(key)) break;

      streak++;

      currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
  };

  const learningStreak = calculateStreak();

  const getSubjectScore = (subject) => {
    const subjectQuizzes = quizHistory.filter(
      (quiz) =>
        quiz.subject &&
        quiz.subject.toLowerCase() === subject.toLowerCase()
    );

    if (subjectQuizzes.length === 0) return 0;

    const total = subjectQuizzes.reduce(
      (sum, quiz) => sum + Number(quiz.percentage || 0),
      0
    );

    return Math.round(total / subjectQuizzes.length);
  };

  const subjects = [
    {
      name: "Java",
      icon: "☕",
      score: getSubjectScore("Java"),
    },
    {
      name: "DBMS",
      icon: "🗄️",
      score: getSubjectScore("DBMS"),
    },
    {
      name: "Operating System",
      icon: "💻",
      score: getSubjectScore("Operating System"),
    },
    {
      name: "Computer Networks",
      icon: "🌐",
      score: getSubjectScore("Computer Networks"),
    },
  ];

  const getLastSevenDays = () => {
    const days = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - i);
      days.push(date);
    }

    return days;
  };

  const getDayScore = (date) => {
    const dateString = date.toLocaleDateString();

    const dayQuizzes = quizHistory.filter(
      (quiz) => quiz.date === dateString
    );

    if (dayQuizzes.length === 0) return 0;

    const total = dayQuizzes.reduce(
      (sum, quiz) => sum + Number(quiz.percentage || 0),
      0
    );

    return Math.round(total / dayQuizzes.length);
  };

  const weeklyData = getLastSevenDays().map((date) => ({
    day: date.toLocaleDateString("en-US", {
      weekday: "short",
    }),
    score: getDayScore(date),
  }));

  const getScoreClass = (score) => {
    if (score >= 80) return "good";
    if (score >= 60) return "average";
    return "low";
  };

  return (
    <main className="progress-content">

      <div className="progress-title">
        <div>
          <span className="progress-label">LEARNING ANALYTICS</span>

          <h1>
            📊 My Progress
          </h1>

          <p>
            Track your learning progress and improve your performance.
          </p>
        </div>

        <div className="progress-summary">
          <strong>{averageScore}%</strong>
          <span>Overall Score</span>
        </div>
      </div>

      <section className="progress-stats">

        <div className="stat-card purple">
          <div className="stat-icon">📚</div>
          <div>
            <strong>{notes.length}</strong>
            <span>Topics Studied</span>
          </div>
        </div>

        <div className="stat-card green">
          <div className="stat-icon">📝</div>
          <div>
            <strong>{quizCount}</strong>
            <span>Quizzes Completed</span>
          </div>
        </div>

        <div className="stat-card blue">
          <div className="stat-icon">⭐</div>
          <div>
            <strong>{averageScore}%</strong>
            <span>Average Score</span>
          </div>
        </div>

        <div className="stat-card orange">
          <div className="stat-icon">🔥</div>
          <div>
            <strong>{learningStreak}</strong>
            <span>Day Streak</span>
          </div>
        </div>

      </section>

      <section className="progress-section">

        <div className="section-heading">
          <div>
            <h2>Weekly Progress</h2>
            <p>Your quiz activity during the last 7 days</p>
          </div>

          <span className="section-badge">
            Last 7 Days
          </span>
        </div>

        <div className="weekly-card">

          <div className="chart-grid">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>

          <div className="weekly-bars">

            {weeklyData.map((item, index) => (
              <div className="day-column" key={index}>

                <div className="bar-area">

                  <div
                    className={`day-bar ${
                      item.score > 0 ? "has-score" : ""
                    }`}
                    style={{
                      height: `${Math.max(item.score, 4)}%`,
                    }}
                  >
                    {item.score > 0 && (
                      <span>{item.score}%</span>
                    )}
                  </div>

                </div>

                <strong>{item.day}</strong>

              </div>
            ))}

          </div>

        </div>

        {quizCount === 0 && (
          <p className="empty-progress">
            Complete your first quiz to start tracking your progress.
          </p>
        )}

      </section>

      <section className="progress-section">

        <div className="section-heading">
          <div>
            <h2>Subject Performance</h2>
            <p>Your average performance in each subject</p>
          </div>
        </div>

        <div className="subjects-grid">

          {subjects.map((subject) => (
            <div className="subject-card" key={subject.name}>

              <div className="subject-top">

                <div className="subject-name">
                  <div className="subject-icon">
                    {subject.icon}
                  </div>

                  <strong>{subject.name}</strong>
                </div>

                <span
                  className={`subject-score ${getScoreClass(
                    subject.score
                  )}`}
                >
                  {subject.score}%
                </span>

              </div>

              <div className="subject-track">
                <div
                  className="subject-fill"
                  style={{
                    width: `${subject.score}%`,
                  }}
                />
              </div>

              <small>
                {subject.score === 0
                  ? "No quiz attempted"
                  : "Average quiz score"}
              </small>

            </div>
          ))}

        </div>

      </section>

      <section className="progress-section">

        <div className="section-heading">
          <div>
            <h2>Recent Quiz Scores</h2>
            <p>Your latest quiz performance</p>
          </div>
        </div>

        <div className="recent-quizzes">

          {quizHistory.length > 0 ? (
            quizHistory.slice(0, 5).map((quiz) => (
              <div className="recent-quiz" key={quiz.id}>

                <div className="quiz-info">

                  <div className="quiz-icon">
                    📝
                  </div>

                  <div>
                    <strong>{quiz.quizName}</strong>

                    <span>
                      {quiz.score}/{quiz.total} questions
                      {quiz.date ? ` • ${quiz.date}` : ""}
                    </span>
                  </div>

                </div>

                <div
                  className={`recent-score ${getScoreClass(
                    Number(quiz.percentage || 0)
                  )}`}
                >
                  {quiz.percentage}%
                </div>

              </div>
            ))
          ) : (
            <div className="no-quiz">
              <span>📝</span>
              <strong>No quizzes completed yet</strong>
              <p>Complete a quiz to see your scores here.</p>
            </div>
          )}

        </div>

      </section>

    </main>
  );
}

export default Progress;