import { useState } from "react";
import "./Progress.css";

function Progress({ onBack }) {
  const [quizHistory] = useState(() => {
    const savedHistory = localStorage.getItem("quizHistory");

    if (savedHistory) {
      try {
        return JSON.parse(savedHistory);
      } catch {
        return [];
      }
    }

    return [];
  });

  const [notes] = useState(() => {
    const savedNotes = localStorage.getItem("studygenieNotes");

    if (savedNotes) {
      try {
        return JSON.parse(savedNotes);
      } catch {
        return [];
      }
    }

    return [];
  });

  /* ============================= */
  /* Overall Statistics */
  /* ============================= */

  const quizCount = quizHistory.length;

  const averageScore =
    quizCount > 0
      ? Math.round(
          quizHistory.reduce(
            (total, quiz) =>
              total + Number(quiz.percentage || 0),
            0
          ) / quizCount
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

    const parts = quiz.date.split("/");

    if (parts.length !== 3) {
      return null;
    }

    const month = Number(parts[0]);
    const day = Number(parts[1]);
    const year = Number(parts[2]);

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
        .map((quiz) =>
          getQuizDateKey(quiz)
        )
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

    const yesterdayKey =
      getDateKey(yesterday);

    /*
      Streak starts only if the latest activity
      was today or yesterday.
    */

    if (
      !activityDates.includes(todayKey) &&
      !activityDates.includes(yesterdayKey)
    ) {
      return 0;
    }

    let streak = 0;

    const currentDate = new Date(today);

    /*
      If there is no activity today,
      start checking from yesterday.
    */

    if (
      !activityDates.includes(todayKey)
    ) {
      currentDate.setDate(
        currentDate.getDate() - 1
      );
    }

    while (true) {
      const key =
        getDateKey(currentDate);

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

  const learningStreak =
    calculateStreak();

  /* ============================= */
  /* Subject Performance */
  /* ============================= */

  const getSubjectScore = (subject) => {
    const subjectQuizzes =
      quizHistory.filter(
        (quiz) =>
          quiz.subject &&
          quiz.subject.toLowerCase() ===
            subject.toLowerCase()
      );

    if (subjectQuizzes.length === 0) {
      return 0;
    }

    const total =
      subjectQuizzes.reduce(
        (sum, quiz) =>
          sum +
          Number(
            quiz.percentage || 0
          ),
        0
      );

    return Math.round(
      total / subjectQuizzes.length
    );
  };

  const javaScore =
    getSubjectScore("Java");

  const dbmsScore =
    getSubjectScore("DBMS");

  const osScore =
    getSubjectScore("Operating System");

  const networkScore =
    getSubjectScore(
      "Computer Networks"
    );

  /* ============================= */
  /* Weekly Progress */
  /* ============================= */

  const getLastSevenDays = () => {
    const days = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();

      date.setHours(0, 0, 0, 0);

      date.setDate(
        date.getDate() - i
      );

      days.push(date);
    }

    return days;
  };

  const getDayName = (date) => {
    return date.toLocaleDateString(
      "en-US",
      {
        weekday: "short",
      }
    );
  };

  const formatDate = (date) => {
    return date.toLocaleDateString();
  };

  const getDayScore = (date) => {
    const dateString =
      formatDate(date);

    const dayQuizzes =
      quizHistory.filter(
        (quiz) =>
          quiz.date === dateString
      );

    if (dayQuizzes.length === 0) {
      return 0;
    }

    const total =
      dayQuizzes.reduce(
        (sum, quiz) =>
          sum +
          Number(
            quiz.percentage || 0
          ),
        0
      );

    return Math.round(
      total / dayQuizzes.length
    );
  };

  const weeklyData =
    getLastSevenDays().map(
      (date) => ({
        day: getDayName(date),
        score: getDayScore(date),
      })
    );

  /* ============================= */
  /* Score Color */
  /* ============================= */

  const getScoreClass = (score) => {
    if (score >= 80) {
      return "good";
    }

    if (score >= 60) {
      return "average";
    }

    return "low";
  };

  return (
    <div className="progress-page">

      {/* ============================= */}
      {/* Header */}
      {/* ============================= */}

      <header className="progress-header">

        <button
          className="back-btn"
          onClick={onBack}
        >
          ← Dashboard
        </button>

        <div>
          <h1>
            📊 My Progress
          </h1>

          <p>
            Track your learning progress
            and performance
          </p>
        </div>

      </header>

      <main className="progress-main">

        {/* ============================= */}
        {/* Statistics */}
        {/* ============================= */}

        <section className="progress-stats">

          <div className="progress-card">

            <span>📚</span>

            <div>
              <h3>
                {notes.length}
              </h3>

              <p>
                Topics Studied
              </p>
            </div>

          </div>

          <div className="progress-card">

            <span>📝</span>

            <div>
              <h3>
                {quizCount}
              </h3>

              <p>
                Quizzes Completed
              </p>
            </div>

          </div>

          <div className="progress-card">

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

          {/* REAL STREAK */}

          <div className="progress-card">

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
        {/* Weekly Progress */}
        {/* ============================= */}

        <section className="progress-section">

          <div className="section-title">

            <h2>
              Weekly Progress
            </h2>

            <p>
              Your actual quiz activity
              during the last 7 days
            </p>

          </div>

          <div className="weekly-card">

            {weeklyData.map(
              (item, index) => (

                <div
                  className="day"
                  key={index}
                >

                  <span>
                    {item.day}
                  </span>

                  <div className="bar">

                    <div
                      style={{
                        height:
                          `${item.score}%`,
                      }}
                    ></div>

                  </div>

                  <small>
                    {item.score}%
                  </small>

                </div>

              )
            )}

          </div>

          {quizCount === 0 && (

            <p
              style={{
                textAlign: "center",
                marginTop: "15px",
                color: "#858c9b",
                fontSize: "13px",
              }}
            >
              Complete a quiz to start
              tracking your progress.
            </p>

          )}

        </section>

        {/* ============================= */}
        {/* Subject Performance */}
        {/* ============================= */}

        <section className="progress-section">

          <div className="section-title">

            <h2>
              Subject Performance
            </h2>

            <p>
              Your average performance
              in each subject
            </p>

          </div>

          <div className="subjects">

            {/* Java */}

            <div className="subject">

              <div className="subject-info">

                <strong>
                  Java
                </strong>

                <span
                  className={getScoreClass(
                    javaScore
                  )}
                >
                  {javaScore}%
                </span>

              </div>

              <div className="subject-bar">

                <div
                  style={{
                    width:
                      `${javaScore}%`,
                  }}
                ></div>

              </div>

            </div>

            {/* DBMS */}

            <div className="subject">

              <div className="subject-info">

                <strong>
                  DBMS
                </strong>

                <span
                  className={getScoreClass(
                    dbmsScore
                  )}
                >
                  {dbmsScore}%
                </span>

              </div>

              <div className="subject-bar">

                <div
                  style={{
                    width:
                      `${dbmsScore}%`,
                  }}
                ></div>

              </div>

            </div>

            {/* Operating System */}

            <div className="subject">

              <div className="subject-info">

                <strong>
                  Operating System
                </strong>

                <span
                  className={getScoreClass(
                    osScore
                  )}
                >
                  {osScore}%
                </span>

              </div>

              <div className="subject-bar">

                <div
                  style={{
                    width:
                      `${osScore}%`,
                  }}
                ></div>

              </div>

            </div>

            {/* Computer Networks */}

            <div className="subject">

              <div className="subject-info">

                <strong>
                  Computer Networks
                </strong>

                <span
                  className={getScoreClass(
                    networkScore
                  )}
                >
                  {networkScore}%
                </span>

              </div>

              <div className="subject-bar">

                <div
                  style={{
                    width:
                      `${networkScore}%`,
                  }}
                ></div>

              </div>

            </div>

          </div>

        </section>

        {/* ============================= */}
        {/* Recent Quiz Scores */}
        {/* ============================= */}

        <section className="progress-section">

          <div className="section-title">

            <h2>
              Recent Quiz Scores
            </h2>

            <p>
              Your latest quiz performance
            </p>

          </div>

          <div className="quiz-results">

            {quizHistory.length > 0 ? (

              quizHistory
                .slice(0, 5)
                .map((quiz) => (

                  <div
                    className="quiz-result-row"
                    key={quiz.id}
                  >

                    <div>

                      <strong>
                        {quiz.quizName}
                      </strong>

                      <p>
                        {quiz.score}/
                        {quiz.total}
                        {" "}questions

                        {quiz.date
                          ? ` • ${quiz.date}`
                          : ""}
                      </p>

                    </div>

                    <span>
                      {quiz.percentage}%
                    </span>

                  </div>

                ))

            ) : (

              <div
                className="quiz-result-row"
              >

                <div>

                  <strong>
                    No quizzes completed
                  </strong>

                  <p>
                    Complete a quiz to
                    see your score here.
                  </p>

                </div>

                <span>
                  —
                </span>

              </div>

            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default Progress;