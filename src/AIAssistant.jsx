import { useEffect, useRef, useState } from "react";
import "./AIAssistant.css";

function AIAssistant({ onBack }) {

  /* ============================= */
  /* Initial AI Message */
  /* ============================= */

  const initialMessage = {
    type: "ai",
    text:
      "Hello! 👋 I'm StudyGenie AI. Ask me anything about your studies.",
  };


  /* ============================= */
  /* States */
  /* ============================= */

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState(() => {

    const savedMessages =
      localStorage.getItem("studygenieChat");

    if (savedMessages) {

      try {

        const parsedMessages =
          JSON.parse(savedMessages);

        if (
          Array.isArray(parsedMessages) &&
          parsedMessages.length > 0
        ) {
          return parsedMessages;
        }

      } catch {
        return [initialMessage];
      }

    }

    return [initialMessage];

  });


  /* ============================= */
  /* Auto Scroll Ref */
  /* ============================= */

  const messagesEndRef = useRef(null);


  /* ============================= */
  /* Automatic Scroll */
  /* ============================= */

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });

  }, [messages]);


  /* ============================= */
  /* Get AI Answer */
  /* ============================= */

  const getAnswer = (text) => {

    const question = text.toLowerCase();


    /* Operating System */

    if (
      question.includes("operating system") ||
      question.includes(" os ")
    ) {

      return (
        "An Operating System is system software that manages " +
        "computer hardware and software. Examples include " +
        "Windows, Linux and macOS. It manages memory, files, " +
        "processes and devices."
      );

    }


    /* DBMS */

    if (
      question.includes("dbms") ||
      question.includes("database")
    ) {

      return (
        "DBMS stands for Database Management System. It is " +
        "software used to store, organize and manage data. " +
        "Examples include MySQL, Oracle and MongoDB."
      );

    }


    /* Java */

    if (question.includes("java")) {

      return (
        "Java is a popular object-oriented programming " +
        "language. It is widely used for web applications, " +
        "Android development, backend systems and enterprise " +
        "software."
      );

    }


    /* Computer Networks */

    if (
      question.includes("computer network") ||
      question.includes("network")
    ) {

      return (
        "A computer network is a group of connected devices " +
        "that communicate and share resources. Common concepts " +
        "include IP addresses, TCP/IP, routers, switches and " +
        "protocols."
      );

    }


    /* DSA */

    if (
      question.includes("dsa") ||
      question.includes("data structure")
    ) {

      return (
        "DSA stands for Data Structures and Algorithms. " +
        "Data structures organize data efficiently, while " +
        "algorithms are step-by-step methods used to solve " +
        "problems."
      );

    }


    /* React */

    if (question.includes("react")) {

      return (
        "React is a JavaScript library used to build user " +
        "interfaces. It uses reusable components and is " +
        "commonly used for creating modern web applications."
      );

    }


    /* HTML */

    if (question.includes("html")) {

      return (
        "HTML stands for HyperText Markup Language. It is " +
        "used to create the structure of web pages using " +
        "elements such as headings, paragraphs, buttons, " +
        "images and links."
      );

    }


    /* CSS */

    if (question.includes("css")) {

      return (
        "CSS stands for Cascading Style Sheets. It is used " +
        "to control the appearance of web pages, including " +
        "colors, spacing, layouts, fonts and responsive design."
      );

    }


    /* JavaScript */

    if (
      question.includes("javascript") ||
      question.includes(" js ")
    ) {

      return (
        "JavaScript is a programming language used to make " +
        "websites interactive. It can handle events, update " +
        "page content, work with APIs and build complete " +
        "web applications."
      );

    }


    /* Greetings */

    if (
      question.includes("hello") ||
      question.includes("hi") ||
      question.includes("hey")
    ) {

      return (
        "Hello! 👋 I'm ready to help you with your studies. " +
        "You can ask me about Java, DBMS, Operating System, " +
        "DSA, Computer Networks or other CS topics."
      );

    }


    /* Thanks */

    if (question.includes("thank")) {

      return (
        "You're welcome! 😊 Keep learning and keep practicing."
      );

    }


    /* Default */

    return (
      "That's a good question! 😊 Try asking me about a " +
      "specific topic such as Java, DBMS, Operating System, " +
      "DSA, Computer Networks, React, HTML or CSS. " +
      "I'll explain it in simple words."
    );

  };


  /* ============================= */
  /* Send Message */
  /* ============================= */

  const sendMessage = (e) => {

    e.preventDefault();

    const text = question.trim();

    if (!text) {
      return;
    }


    const userMessage = {
      type: "user",
      text: text,
    };


    const aiMessage = {
      type: "ai",
      text: getAnswer(text),
    };


    const updatedMessages = [
      ...messages,
      userMessage,
      aiMessage,
    ];


    /* Update UI */

    setMessages(updatedMessages);


    /* Save Chat */

    localStorage.setItem(
      "studygenieChat",
      JSON.stringify(updatedMessages)
    );


    /* Clear Input */

    setQuestion("");

  };


  /* ============================= */
  /* Clear Complete Chat */
  /* ============================= */

  const clearChat = () => {

    const freshChat = [
      initialMessage
    ];


    setMessages(freshChat);


    localStorage.setItem(
      "studygenieChat",
      JSON.stringify(freshChat)
    );

  };


  /* ============================= */
  /* JSX */
  /* ============================= */

  return (

    <div className="ai-page">


      {/* ============================= */}
      {/* Header */}
      {/* ============================= */}

      <header className="ai-header">


        {/* Back */}

        <button
          type="button"
          className="ai-back-btn"
          onClick={onBack}
        >
          ← Dashboard
        </button>


        {/* AI Title */}

        <div className="ai-title">


          <div className="ai-avatar">
            🤖
          </div>


          <div>

            <h1>
              StudyGenie AI
            </h1>

            <p>
              Your personal AI study assistant
            </p>

          </div>


        </div>


        {/* Status */}

        <div className="ai-status">

          <span></span>

          Online


          {/* Clear Chat */}

          <button
            type="button"
            className="clear-chat-btn"
            onClick={clearChat}
          >
            🗑️ Clear Chat
          </button>

        </div>


      </header>



      {/* ============================= */}
      {/* Main */}
      {/* ============================= */}

      <main className="ai-main">


        <div className="chat-container">


          {/* ============================= */}
          {/* Messages */}
          {/* ============================= */}

          <div className="messages">


            {messages.map((message, index) => (

              <div
                key={index}
                className={`chat-message ${
                  message.type === "user"
                    ? "user-chat"
                    : "ai-chat"
                }`}
              >


                {/* AI Avatar */}

                {message.type === "ai" && (

                  <div className="message-avatar">
                    🤖
                  </div>

                )}


                {/* Message */}

                <div className="message-content">

                  {message.text}

                </div>


              </div>

            ))}


            {/* ============================= */}
            {/* Auto Scroll Target */}
            {/* ============================= */}

            <div ref={messagesEndRef}></div>


          </div>



          {/* ============================= */}
          {/* Input */}
          {/* ============================= */}

          <form
            className="ai-input-area"
            onSubmit={sendMessage}
          >


            <input
              type="text"
              placeholder="Ask anything about your studies..."
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
            />


            <button
              type="submit"
              disabled={!question.trim()}
              title="Send message"
            >
              ➤
            </button>


          </form>



          {/* ============================= */}
          {/* Disclaimer */}
          {/* ============================= */}

          <p className="ai-disclaimer">

            StudyGenie AI can make mistakes.
            Always verify important information.

          </p>


        </div>


      </main>


    </div>

  );

}

export default AIAssistant;