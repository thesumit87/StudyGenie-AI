import { useState } from "react";
import "./Quiz.css";

function Quiz({ onBack }) {
  const questionBank = {
    Java: [
      {
        question: "Which keyword is used to create a class in Java?",
        options: ["function", "class", "object", "new"],
        answer: "class",
        difficulty: "Easy",
      },
      {
        question:
          "Which concept allows one class to acquire properties of another class?",
        options: [
          "Encapsulation",
          "Polymorphism",
          "Inheritance",
          "Abstraction",
        ],
        answer: "Inheritance",
        difficulty: "Easy",
      },
      {
        question: "Which method is the entry point of a Java program?",
        options: ["start()", "run()", "main()", "execute()"],
        answer: "main()",
        difficulty: "Easy",
      },
      {
        question: "Which collection does not allow duplicate elements?",
        options: ["ArrayList", "LinkedList", "HashSet", "Vector"],
        answer: "HashSet",
        difficulty: "Easy",
      },
      {
        question: "Which data type is used to store true or false?",
        options: ["int", "String", "boolean", "char"],
        answer: "boolean",
        difficulty: "Easy",
      },
      {
        question: "Which keyword is used to inherit a class in Java?",
        options: ["implements", "extends", "inherits", "super"],
        answer: "extends",
        difficulty: "Medium",
      },
      {
        question: "Which keyword is used to prevent method overriding?",
        options: ["static", "final", "private", "constant"],
        answer: "final",
        difficulty: "Medium",
      },
      {
        question: "Which of these is not an OOP concept?",
        options: [
          "Inheritance",
          "Encapsulation",
          "Compilation",
          "Polymorphism",
        ],
        answer: "Compilation",
        difficulty: "Easy",
      },
      {
        question: "Which keyword is used to create an object in Java?",
        options: ["create", "object", "new", "class"],
        answer: "new",
        difficulty: "Easy",
      },
      {
        question:
          "Which exception occurs when dividing an integer by zero?",
        options: [
          "NullPointerException",
          "ArithmeticException",
          "IOException",
          "ClassNotFoundException",
        ],
        answer: "ArithmeticException",
        difficulty: "Medium",
      },
    ],

    DBMS: [
      {
        question: "What does DBMS stand for?",
        options: [
          "Database Management System",
          "Data Backup Management System",
          "Database Machine System",
          "Data Management Software",
        ],
        answer: "Database Management System",
        difficulty: "Easy",
      },
      {
        question: "Which key uniquely identifies a record in a table?",
        options: [
          "Foreign Key",
          "Primary Key",
          "Candidate Key",
          "Alternate Key",
        ],
        answer: "Primary Key",
        difficulty: "Easy",
      },
      {
        question: "Which language is used to query databases?",
        options: ["HTML", "CSS", "SQL", "XML"],
        answer: "SQL",
        difficulty: "Easy",
      },
      {
        question: "Which command is used to retrieve data?",
        options: ["GET", "SELECT", "FETCH", "READ"],
        answer: "SELECT",
        difficulty: "Easy",
      },
      {
        question: "Which normal form removes partial dependency?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        answer: "2NF",
        difficulty: "Medium",
      },
      {
        question: "Which SQL command is used to remove a table?",
        options: ["DELETE", "REMOVE", "DROP", "CLEAR"],
        answer: "DROP",
        difficulty: "Easy",
      },
      {
        question: "Which key creates a relationship between two tables?",
        options: [
          "Primary Key",
          "Foreign Key",
          "Super Key",
          "Composite Key",
        ],
        answer: "Foreign Key",
        difficulty: "Easy",
      },
      {
        question: "Which operation combines rows from two or more tables?",
        options: ["JOIN", "MERGE", "UNION", "CONNECT"],
        answer: "JOIN",
        difficulty: "Medium",
      },
      {
        question: "What is a collection of related data called?",
        options: [
          "Database",
          "Program",
          "Algorithm",
          "Network",
        ],
        answer: "Database",
        difficulty: "Easy",
      },
      {
        question:
          "Which property ensures that a transaction is completed fully or not at all?",
        options: [
          "Consistency",
          "Atomicity",
          "Isolation",
          "Durability",
        ],
        answer: "Atomicity",
        difficulty: "Medium",
      },
    ],

    "Operating System": [
      {
        question: "What is the main function of an Operating System?",
        options: [
          "Manage hardware and software",
          "Create websites",
          "Design databases",
          "Write programs",
        ],
        answer: "Manage hardware and software",
        difficulty: "Easy",
      },
      {
        question: "Which of these is an Operating System?",
        options: ["Java", "Windows", "Oracle", "HTML"],
        answer: "Windows",
        difficulty: "Easy",
      },
      {
        question: "Which component manages processes?",
        options: [
          "Process Scheduler",
          "Compiler",
          "Browser",
          "Database",
        ],
        answer: "Process Scheduler",
        difficulty: "Medium",
      },
      {
        question: "What is a process?",
        options: [
          "Program in execution",
          "Computer hardware",
          "File system",
          "Programming language",
        ],
        answer: "Program in execution",
        difficulty: "Easy",
      },
      {
        question: "Which memory management technique uses pages?",
        options: [
          "Paging",
          "Segmentation",
          "Swapping",
          "Caching",
        ],
        answer: "Paging",
        difficulty: "Medium",
      },
      {
        question: "Which scheduling algorithm uses a time quantum?",
        options: [
          "FCFS",
          "Round Robin",
          "SJF",
          "Priority",
        ],
        answer: "Round Robin",
        difficulty: "Easy",
      },
      {
        question: "Deadlock requires how many necessary conditions?",
        options: ["2", "3", "4", "5"],
        answer: "4",
        difficulty: "Medium",
      },
      {
        question: "Which is a type of Operating System?",
        options: [
          "Real-Time OS",
          "HTML OS",
          "SQL OS",
          "Java OS",
        ],
        answer: "Real-Time OS",
        difficulty: "Easy",
      },
      {
        question: "What does CPU scheduling decide?",
        options: [
          "Which process gets CPU",
          "Which file to delete",
          "Which user logs in",
          "Which program to install",
        ],
        answer: "Which process gets CPU",
        difficulty: "Medium",
      },
      {
        question:
          "Virtual memory uses which storage as an extension of RAM?",
        options: [
          "Hard disk/SSD",
          "Keyboard",
          "Monitor",
          "CPU cache",
        ],
        answer: "Hard disk/SSD",
        difficulty: "Medium",
      },
    ],

    "Computer Networks": [
      {
        question: "Which device connects different networks?",
        options: ["Switch", "Router", "Hub", "Repeater"],
        answer: "Router",
        difficulty: "Easy",
      },
      {
        question: "How many layers are there in the OSI model?",
        options: ["5", "6", "7", "8"],
        answer: "7",
        difficulty: "Easy",
      },
      {
        question: "Which protocol is used to browse websites?",
        options: ["HTTP", "FTP", "SMTP", "SSH"],
        answer: "HTTP",
        difficulty: "Easy",
      },
      {
        question: "Which protocol is used to send email?",
        options: ["SMTP", "HTTP", "FTP", "DNS"],
        answer: "SMTP",
        difficulty: "Easy",
      },
      {
        question: "What does IP stand for?",
        options: [
          "Internet Protocol",
          "Internal Program",
          "Internet Process",
          "Interface Protocol",
        ],
        answer: "Internet Protocol",
        difficulty: "Easy",
      },
      {
        question:
          "Which protocol converts domain names into IP addresses?",
        options: ["DNS", "DHCP", "FTP", "ARP"],
        answer: "DNS",
        difficulty: "Medium",
      },
      {
        question: "Which protocol automatically assigns IP addresses?",
        options: ["DNS", "DHCP", "HTTP", "TCP"],
        answer: "DHCP",
        difficulty: "Medium",
      },
      {
        question: "Which protocol provides reliable data delivery?",
        options: ["UDP", "TCP", "IP", "ICMP"],
        answer: "TCP",
        difficulty: "Easy",
      },
      {
        question:
          "Which device forwards frames using MAC addresses?",
        options: ["Router", "Switch", "Modem", "Gateway"],
        answer: "Switch",
        difficulty: "Medium",
      },
      {
        question: "Which layer of OSI handles routing?",
        options: [
          "Transport",
          "Network",
          "Session",
          "Application",
        ],
        answer: "Network",
        difficulty: "Medium",
      },
    ],

    DSA: [
      {
        question: "Which data structure follows LIFO?",
        options: [
          "Queue",
          "Stack",
          "Array",
          "Linked List",
        ],
        answer: "Stack",
        difficulty: "Easy",
      },
      {
        question: "Which data structure follows FIFO?",
        options: [
          "Stack",
          "Queue",
          "Tree",
          "Graph",
        ],
        answer: "Queue",
        difficulty: "Easy",
      },
      {
        question: "What is the time complexity of binary search?",
        options: [
          "O(n)",
          "O(log n)",
          "O(n²)",
          "O(1)",
        ],
        answer: "O(log n)",
        difficulty: "Medium",
      },
      {
        question: "Which data structure is used in BFS?",
        options: [
          "Stack",
          "Queue",
          "Heap",
          "Array",
        ],
        answer: "Queue",
        difficulty: "Medium",
      },
      {
        question: "Which data structure is used in DFS?",
        options: [
          "Queue",
          "Stack",
          "Heap",
          "Hash Table",
        ],
        answer: "Stack",
        difficulty: "Medium",
      },
      {
        question:
          "Which sorting algorithm has average O(n log n) complexity?",
        options: [
          "Bubble Sort",
          "Selection Sort",
          "Merge Sort",
          "Linear Search",
        ],
        answer: "Merge Sort",
        difficulty: "Medium",
      },
      {
        question: "Which data structure stores key-value pairs?",
        options: [
          "Stack",
          "Hash Table",
          "Queue",
          "Linked List",
        ],
        answer: "Hash Table",
        difficulty: "Easy",
      },
      {
        question:
          "Which tree has at most two children per node?",
        options: [
          "Binary Tree",
          "B-Tree",
          "Trie",
          "Graph",
        ],
        answer: "Binary Tree",
        difficulty: "Easy",
      },
      {
        question:
          "Which algorithm finds the shortest path in a weighted graph with non-negative weights?",
        options: [
          "Dijkstra",
          "Binary Search",
          "KMP",
          "Merge Sort",
        ],
        answer: "Dijkstra",
        difficulty: "Hard",
      },
      {
        question: "What is the worst-case complexity of Bubble Sort?",
        options: [
          "O(1)",
          "O(log n)",
          "O(n)",
          "O(n²)",
        ],
        answer: "O(n²)",
        difficulty: "Easy",
      },
    ],
  };

  const [started, setStarted] = useState(false);
  const [subject, setSubject] = useState("Java");
  const [difficulty, setDifficulty] = useState("All");
  const [questionCount, setQuestionCount] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answerChecked, setAnswerChecked] = useState(false);

  const startQuiz = () => {
    let list = questionBank[subject] || [];

    if (difficulty !== "All") {
      list = list.filter(
        (item) => item.difficulty === difficulty
      );
    }

    const selected = [...list]
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(questionCount, list.length));

    if (!selected.length) {
      return;
    }

    setQuestions(selected);
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setFinished(false);
    setAnswerChecked(false);
    setStarted(true);
  };

  const selectAnswer = (option) => {
    if (answerChecked) {
      return;
    }

    setSelectedAnswer(option);
    setAnswerChecked(true);
  };

  const nextQuestion = () => {
    if (!answerChecked) {
      return;
    }

    const current = questions[currentQuestion];

    const newScore =
      selectedAnswer === current.answer
        ? score + 1
        : score;

    if (currentQuestion === questions.length - 1) {
      const percentage = Math.round(
        (newScore / questions.length) * 100
      );

      const history = JSON.parse(
        localStorage.getItem("quizHistory") || "[]"
      );

      const quiz = {
        id: Date.now(),
        quizName: `${subject} Quiz`,
        subject,
        difficulty,
        score: newScore,
        total: questions.length,
        percentage,
        date: new Date().toLocaleDateString(),
      };

      localStorage.setItem(
        "quizHistory",
        JSON.stringify([quiz, ...history])
      );

      window.dispatchEvent(
        new Event("studygenie-update")
      );

      setScore(newScore);
      setFinished(true);
      return;
    }

    setScore(newScore);
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer("");
    setAnswerChecked(false);
  };

  const restartQuiz = () => {
    setStarted(false);
    setFinished(false);
    setQuestions([]);
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setAnswerChecked(false);
  };

  const percentage = questions.length
    ? Math.round((score / questions.length) * 100)
    : 0;

  if (!started) {
    return (
      <section className="quiz-content-page">

        <div className="quiz-hero">

          <div>
            <span className="quiz-label">
              TEST YOUR KNOWLEDGE
            </span>

            <h1>
              StudyGenie <span>Quiz</span>
            </h1>

            <p>
              Practice your subjects, test your knowledge
              and improve your preparation.
            </p>
          </div>

          <div className="quiz-hero-icon">
            📝
          </div>

        </div>

        <div className="quiz-setup-card">

          <div className="setup-heading">
            <div>
              <h2>Build Your Quiz</h2>
              <p>
                Choose your subject, level and number of questions.
              </p>
            </div>

            <div className="setup-badge">
              ✦ Practice Mode
            </div>
          </div>

          <div className="quiz-options">

            <div className="quiz-field">
              <label>Subject</label>

              <div className="select-wrap">
                <span>📚</span>

                <select
                  value={subject}
                  onChange={(e) =>
                    setSubject(e.target.value)
                  }
                >
                  {Object.keys(questionBank).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="quiz-field">
              <label>Difficulty</label>

              <div className="select-wrap">
                <span>⚡</span>

                <select
                  value={difficulty}
                  onChange={(e) =>
                    setDifficulty(e.target.value)
                  }
                >
                  <option value="All">All Levels</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <div className="quiz-field">
              <label>Questions</label>

              <div className="select-wrap">
                <span>📝</span>

                <select
                  value={questionCount}
                  onChange={(e) =>
                    setQuestionCount(
                      Number(e.target.value)
                    )
                  }
                >
                  <option value={5}>5 Questions</option>
                  <option value={10}>10 Questions</option>
                </select>
              </div>
            </div>

          </div>

          <button
            type="button"
            className="start-quiz-btn"
            onClick={startQuiz}
          >
            Start Quiz
            <span>→</span>
          </button>

        </div>

        <div className="quiz-info-grid">

          <div className="quiz-info-card">
            <div className="info-icon purple">✦</div>
            <div>
              <strong>Practice Smart</strong>
              <p>Random questions every time.</p>
            </div>
          </div>

          <div className="quiz-info-card">
            <div className="info-icon green">✓</div>
            <div>
              <strong>Instant Feedback</strong>
              <p>Know your answer immediately.</p>
            </div>
          </div>

          <div className="quiz-info-card">
            <div className="info-icon orange">★</div>
            <div>
              <strong>Track Progress</strong>
              <p>Your scores are saved automatically.</p>
            </div>
          </div>

        </div>

      </section>
    );
  }

  if (finished) {
    return (
      <section className="quiz-content-page">

        <div className="quiz-result-card">

          <div className="result-icon">
            🎉
          </div>

          <span className="quiz-label">
            QUIZ COMPLETED
          </span>

          <h1>
            Great Job!
          </h1>

          <p>
            You completed the {subject} quiz.
          </p>

          <div className="result-score">

            <strong>
              {percentage}%
            </strong>

            <span>
              {score} correct out of {questions.length}
            </span>

          </div>

          <div className="result-message">
            {percentage >= 80
              ? "Excellent work! Keep up the great preparation. 🎉"
              : percentage >= 60
              ? "Good job! Keep practicing to improve further. 👍"
              : "Keep practicing. You will improve with consistency. 💪"}
          </div>

          <div className="result-buttons">

            <button
              type="button"
              onClick={restartQuiz}
            >
              Try Again
            </button>

            <button
              type="button"
              className="result-back-btn"
              onClick={onBack}
            >
              Back to Dashboard
            </button>

          </div>

        </div>

      </section>
    );
  }

  const question = questions[currentQuestion];
  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  const labels = ["A", "B", "C", "D"];

  return (
    <section className="quiz-content-page">

      <div className="active-quiz-header">

        <div>
          <span className="quiz-label">
            {subject.toUpperCase()} QUIZ
          </span>

          <h1>
            Practice Quiz
          </h1>
        </div>

        <button
          type="button"
          className="exit-quiz-btn"
          onClick={restartQuiz}
        >
          Exit Quiz
        </button>

      </div>

      <div className="quiz-progress-top">

        <div>
          Question {currentQuestion + 1} of{" "}
          {questions.length}
        </div>

        <strong>
          {Math.round(progress)}%
        </strong>

      </div>

      <div className="quiz-progress-bar">
        <div style={{ width: `${progress}%` }} />
      </div>

      <div className="question-card">

        <div className="question-card-header">

          <span>
            Question {currentQuestion + 1}
          </span>

          <span className="score-pill">
            Score: {score}
          </span>

        </div>

        <h2>
          {question.question}
        </h2>

        <div className="options">

          {question.options.map((option, index) => {

            const correct =
              answerChecked &&
              option === question.answer;

            const wrong =
              answerChecked &&
              option === selectedAnswer &&
              option !== question.answer;

            return (
              <button
                type="button"
                key={option}
                disabled={answerChecked}
                className={`quiz-option ${
                  selectedAnswer === option
                    ? "selected"
                    : ""
                } ${correct ? "correct" : ""} ${
                  wrong ? "wrong" : ""
                }`}
                onClick={() =>
                  selectAnswer(option)
                }
              >
                <span className="option-label">
                  {labels[index]}
                </span>

                <span>
                  {option}
                </span>

                {correct && (
                  <span className="option-status">
                    ✓
                  </span>
                )}

                {wrong && (
                  <span className="option-status">
                    ✕
                  </span>
                )}
              </button>
            );
          })}

        </div>

        {answerChecked && (
          <div
            className={
              selectedAnswer === question.answer
                ? "answer-message correct-message"
                : "answer-message wrong-message"
            }
          >
            {selectedAnswer === question.answer
              ? "✓ Correct Answer! 🎉"
              : `✕ Incorrect. Correct Answer: ${question.answer}`}
          </div>
        )}

        <div className="question-footer">

          <span>
            {answerChecked
              ? "Answer selected"
              : "Select an answer to continue"}
          </span>

          <button
            type="button"
            className="next-question-btn"
            disabled={!answerChecked}
            onClick={nextQuestion}
          >
            {currentQuestion === questions.length - 1
              ? "Finish Quiz"
              : "Next Question"}
            <span>→</span>
          </button>

        </div>

      </div>

    </section>
  );
}

export default Quiz;