import { useState } from "react";
import "./Quiz.css";

function Quiz({ onBack }) {
  /* ============================= */
  /* Quiz Question Bank */
  /* ============================= */

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
        question:
          "Which collection does not allow duplicate elements?",
        options: [
          "ArrayList",
          "LinkedList",
          "HashSet",
          "Vector",
        ],
        answer: "HashSet",
        difficulty: "Easy",
      },
      {
        question:
          "Which data type is used to store true or false?",
        options: ["int", "String", "boolean", "char"],
        answer: "boolean",
        difficulty: "Easy",
      },
      {
        question:
          "Which keyword is used to inherit a class in Java?",
        options: ["implements", "extends", "inherits", "super"],
        answer: "extends",
        difficulty: "Medium",
      },
      {
        question:
          "Which keyword is used to prevent method overriding?",
        options: ["static", "final", "private", "constant"],
        answer: "final",
        difficulty: "Medium",
      },
      {
        question:
          "Which of these is not an OOP concept?",
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
        question:
          "Which keyword is used to create an object in Java?",
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
        question:
          "Which key uniquely identifies a record in a table?",
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
        question:
          "Which language is used to query databases?",
        options: ["HTML", "CSS", "SQL", "XML"],
        answer: "SQL",
        difficulty: "Easy",
      },
      {
        question:
          "Which command is used to retrieve data?",
        options: ["GET", "SELECT", "FETCH", "READ"],
        answer: "SELECT",
        difficulty: "Easy",
      },
      {
        question:
          "Which normal form removes partial dependency?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        answer: "2NF",
        difficulty: "Medium",
      },
      {
        question:
          "Which SQL command is used to remove a table?",
        options: ["DELETE", "REMOVE", "DROP", "CLEAR"],
        answer: "DROP",
        difficulty: "Easy",
      },
      {
        question:
          "Which key creates a relationship between two tables?",
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
        question:
          "Which operation combines rows from two or more tables?",
        options: [
          "JOIN",
          "MERGE",
          "UNION",
          "CONNECT",
        ],
        answer: "JOIN",
        difficulty: "Medium",
      },
      {
        question:
          "What is a collection of related data called?",
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
        question:
          "What is the main function of an Operating System?",
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
        question:
          "Which of these is an Operating System?",
        options: [
          "Java",
          "Windows",
          "Oracle",
          "HTML",
        ],
        answer: "Windows",
        difficulty: "Easy",
      },
      {
        question:
          "Which component manages processes?",
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
        question:
          "What is a process?",
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
        question:
          "Which memory management technique uses pages?",
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
        question:
          "Which scheduling algorithm uses a time quantum?",
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
        question:
          "Deadlock requires how many necessary conditions?",
        options: ["2", "3", "4", "5"],
        answer: "4",
        difficulty: "Medium",
      },
      {
        question:
          "Which is a type of Operating System?",
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
        question:
          "What does CPU scheduling decide?",
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
        question:
          "Which device connects different networks?",
        options: [
          "Switch",
          "Router",
          "Hub",
          "Repeater",
        ],
        answer: "Router",
        difficulty: "Easy",
      },
      {
        question:
          "How many layers are there in the OSI model?",
        options: ["5", "6", "7", "8"],
        answer: "7",
        difficulty: "Easy",
      },
      {
        question:
          "Which protocol is used to browse websites?",
        options: ["HTTP", "FTP", "SMTP", "SSH"],
        answer: "HTTP",
        difficulty: "Easy",
      },
      {
        question:
          "Which protocol is used to send email?",
        options: ["SMTP", "HTTP", "FTP", "DNS"],
        answer: "SMTP",
        difficulty: "Easy",
      },
      {
        question:
          "What does IP stand for?",
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
        question:
          "Which protocol automatically assigns IP addresses?",
        options: ["DNS", "DHCP", "HTTP", "TCP"],
        answer: "DHCP",
        difficulty: "Medium",
      },
      {
        question:
          "Which protocol provides reliable data delivery?",
        options: ["UDP", "TCP", "IP", "ICMP"],
        answer: "TCP",
        difficulty: "Easy",
      },
      {
        question:
          "Which device forwards frames using MAC addresses?",
        options: [
          "Router",
          "Switch",
          "Modem",
          "Gateway",
        ],
        answer: "Switch",
        difficulty: "Medium",
      },
      {
        question:
          "Which layer of OSI handles routing?",
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
        question:
          "Which data structure follows LIFO?",
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
        question:
          "Which data structure follows FIFO?",
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
        question:
          "What is the time complexity of binary search?",
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
        question:
          "Which data structure is used in BFS?",
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
        question:
          "Which data structure is used in DFS?",
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
        question:
          "Which data structure stores key-value pairs?",
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
        question:
          "What is the worst-case complexity of Bubble Sort?",
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

  /* ============================= */
  /* Setup States */
  /* ============================= */

  const [started, setStarted] = useState(false);

  const [subject, setSubject] = useState("Java");

  const [difficulty, setDifficulty] = useState("All");

  const [questionCount, setQuestionCount] = useState(5);

  /* ============================= */
  /* Quiz States */
  /* ============================= */

  const [questions, setQuestions] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState("");

  const [score, setScore] = useState(0);

  const [finished, setFinished] = useState(false);

  // NEW: answer checked state
  const [answerChecked, setAnswerChecked] = useState(false);

  /* ============================= */
  /* Start Quiz */
  /* ============================= */

  const startQuiz = () => {
    let availableQuestions = questionBank[subject];

    if (difficulty !== "All") {
      availableQuestions = availableQuestions.filter(
        (item) => item.difficulty === difficulty
      );
    }

    const shuffled = [...availableQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(
        0,
        Math.min(
          questionCount,
          availableQuestions.length
        )
      );

    setQuestions(shuffled);
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setFinished(false);
    setAnswerChecked(false);
    setStarted(true);
  };

  /* ============================= */
  /* Select Answer */
  /* ============================= */

  const selectAnswer = (option) => {
    // Don't allow changing answer after checking
    if (answerChecked) {
      return;
    }

    setSelectedAnswer(option);
    setAnswerChecked(true);
  };

  /* ============================= */
  /* Next Question */
  /* ============================= */

  const nextQuestion = () => {
    if (!selectedAnswer || !answerChecked) {
      return;
    }

    const current = questions[currentQuestion];

    let newScore = score;

    if (selectedAnswer === current.answer) {
      newScore = score + 1;
      setScore(newScore);
    }

    /* Last Question */

    if (
      currentQuestion ===
      questions.length - 1
    ) {
      const percentage = Math.round(
        (newScore / questions.length) * 100
      );

      /* Save Quiz History */

      const oldHistory = JSON.parse(
        localStorage.getItem("quizHistory") || "[]"
      );

      const newQuiz = {
        id: Date.now(),
        quizName: `${subject} Quiz`,
        subject: subject,
        difficulty: difficulty,
        score: newScore,
        total: questions.length,
        percentage: percentage,
        date: new Date().toLocaleDateString(),
      };

      const updatedHistory = [
        newQuiz,
        ...oldHistory,
      ];

      localStorage.setItem(
        "quizHistory",
        JSON.stringify(updatedHistory)
      );

      setScore(newScore);
      setFinished(true);
    } else {
      setCurrentQuestion(
        currentQuestion + 1
      );

      setSelectedAnswer("");
      setAnswerChecked(false);
    }
  };

  /* ============================= */
  /* Restart */
  /* ============================= */

  const restartQuiz = () => {
    setStarted(false);
    setFinished(false);
    setQuestions([]);
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setAnswerChecked(false);
  };

  /* ============================= */
  /* Setup Screen */
  /* ============================= */

  if (!started) {
    return (
      <div className="quiz-page">

        <header className="quiz-header">

          <button
            className="back-btn"
            onClick={onBack}
          >
            ← Dashboard
          </button>

          <div>
            <h1>
              📝 StudyGenie Quiz
            </h1>

            <p>
              Test your knowledge
            </p>
          </div>

        </header>

        <main className="quiz-main">

          <div className="question-card">

            <span className="question-number">
              QUIZ SETUP
            </span>

            <h2>
              Customize your quiz
            </h2>

            {/* Subject */}

            <div className="quiz-setting">

              <label>
                📚 Choose Subject
              </label>

              <select
                value={subject}
                onChange={(e) =>
                  setSubject(e.target.value)
                }
              >

                {Object.keys(
                  questionBank
                ).map((item) => (

                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>

                ))}

              </select>

            </div>

            {/* Difficulty */}

            <div className="quiz-setting">

              <label>
                🎯 Difficulty
              </label>

              <select
                value={difficulty}
                onChange={(e) =>
                  setDifficulty(e.target.value)
                }
              >

                <option value="All">
                  All Levels
                </option>

                <option value="Easy">
                  Easy
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="Hard">
                  Hard
                </option>

              </select>

            </div>

            {/* Number */}

            <div className="quiz-setting">

              <label>
                🔢 Number of Questions
              </label>

              <select
                value={questionCount}
                onChange={(e) =>
                  setQuestionCount(
                    Number(e.target.value)
                  )
                }
              >

                <option value={5}>
                  5 Questions
                </option>

                <option value={10}>
                  10 Questions
                </option>

              </select>

            </div>

            <button
              className="next-btn"
              onClick={startQuiz}
            >
              Start Quiz →
            </button>

          </div>

        </main>

      </div>
    );
  }

  /* ============================= */
  /* Result Screen */
  /* ============================= */

  if (finished) {

    const percentage = Math.round(
      (score / questions.length) * 100
    );

    let message =
      "Keep practicing! 💪";

    if (percentage >= 80) {
      message =
        "Excellent work! 🎉";
    } else if (percentage >= 60) {
      message =
        "Good job! Keep improving! 👍";
    }

    return (
      <div className="quiz-page">

        <div className="quiz-result">

          <div className="result-icon">
            🎉
          </div>

          <h1>
            Quiz Completed!
          </h1>

          <p>
            {message}
          </p>

          <p>
            {subject} • {difficulty}
          </p>

          <div className="score-box">

            <strong>
              {score}/{questions.length}
            </strong>

            <span>
              {percentage}% Score
            </span>

          </div>

          <div className="result-buttons">

            <button
              onClick={restartQuiz}
            >
              Try Again
            </button>

            <button
              className="back-result"
              onClick={onBack}
            >
              Back to Dashboard
            </button>

          </div>

        </div>

      </div>
    );
  }

  /* ============================= */
  /* Active Quiz */
  /* ============================= */

  const question =
    questions[currentQuestion];

  /* ============================= */
  /* Option Style */
  /* ============================= */

  const getOptionStyle = (option) => {

    if (!answerChecked) {
      return {};
    }

    // Correct answer
    if (option === question.answer) {
      return {
        border: "2px solid #22c55e",
        background: "#ecfdf5",
        color: "#15803d",
        fontWeight: "700",
      };
    }

    // Wrong selected answer
    if (
      option === selectedAnswer &&
      option !== question.answer
    ) {
      return {
        border: "2px solid #ef4444",
        background: "#fef2f2",
        color: "#dc2626",
        fontWeight: "700",
      };
    }

    return {
      opacity: "0.65",
    };
  };

  return (
    <div className="quiz-page">

      {/* Header */}

      <header className="quiz-header">

        <button
          className="back-btn"
          onClick={onBack}
        >
          ← Dashboard
        </button>

        <div>

          <h1>
            📝 {subject} Quiz
          </h1>

          <p>
            {difficulty === "All"
              ? "All difficulty levels"
              : `${difficulty} level`}
          </p>

        </div>

        <div className="quiz-count">

          {currentQuestion + 1}
          {" / "}
          {questions.length}

        </div>

      </header>

      {/* Main */}

      <main className="quiz-main">

        {/* Progress */}

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width:
                `${
                  ((currentQuestion + 1) /
                    questions.length) *
                  100
                }%`,
            }}
          />

        </div>

        {/* Question */}

        <div className="question-card">

          <span className="question-number">

            Question{" "}
            {currentQuestion + 1}

          </span>

          <h2>
            {question.question}
          </h2>

          {/* Options */}

          <div className="options">

            {question.options.map(
              (option, index) => {

                const labels = [
                  "A",
                  "B",
                  "C",
                  "D",
                ];

                return (
                  <button
                    key={option}
                    className={`option ${
                      selectedAnswer === option
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      selectAnswer(option)
                    }
                    disabled={answerChecked}
                    style={getOptionStyle(option)}
                  >

                    <span
                      className="option-label"
                      style={
                        answerChecked &&
                        option === question.answer
                          ? {
                              background:
                                "#22c55e",
                              color: "white",
                              borderColor:
                                "#22c55e",
                            }
                          : answerChecked &&
                            option ===
                              selectedAnswer &&
                            option !==
                              question.answer
                          ? {
                              background:
                                "#ef4444",
                              color: "white",
                              borderColor:
                                "#ef4444",
                            }
                          : {}
                      }
                    >
                      {labels[index]}
                    </span>

                    <span className="option-text">
                      {option}
                    </span>

                  </button>
                );
              }
            )}

          </div>

          {/* Answer Feedback */}

          {answerChecked && (

            <div
              style={{
                marginTop: "18px",
                padding: "13px 16px",
                borderRadius: "10px",
                background:
                  selectedAnswer ===
                  question.answer
                    ? "#ecfdf5"
                    : "#fef2f2",
                color:
                  selectedAnswer ===
                  question.answer
                    ? "#15803d"
                    : "#dc2626",
                fontSize: "14px",
                fontWeight: "600",
                border:
                  selectedAnswer ===
                  question.answer
                    ? "1px solid #bbf7d0"
                    : "1px solid #fecaca",
              }}
            >

              {selectedAnswer ===
              question.answer ? (
                <>
                  ✓ Correct Answer! 🎉
                </>
              ) : (
                <>
                  ✗ Incorrect Answer.
                  <br />

                  <span
                    style={{
                      display: "inline-block",
                      marginTop: "5px",
                    }}
                  >
                    Correct Answer:{" "}
                    <strong>
                      {question.answer}
                    </strong>
                  </span>
                </>
              )}

            </div>

          )}

          {/* Next */}

          <button
            className="next-btn"
            onClick={nextQuestion}
            disabled={!answerChecked}
          >

            {!answerChecked
              ? "Select an Answer"
              : currentQuestion ===
                questions.length - 1
              ? "Finish Quiz 🎉"
              : "Next Question →"}

          </button>

        </div>

      </main>

    </div>
  );
}
export default Quiz;