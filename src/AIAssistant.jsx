import { useEffect, useRef, useState } from "react";
import "./AIAssistant.css";

function formatInline(text) {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index}>
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={index}>
          {part.slice(1, -1)}
        </code>
      );
    }

    return <span key={index}>{part}</span>;
  });
}

function formatAIText(text) {
  if (!text) return null;

  const lines = text.replace(/\r/g, "").split("\n");

  const elements = [];
  let listItems = [];
  let listType = null;
  let codeLines = [];
  let inCode = false;

  const closeList = () => {
    if (!listItems.length) return;

    const ListTag = listType === "number" ? "ol" : "ul";

    elements.push(
      <ListTag key={`list-${elements.length}`}>
        {listItems.map((item, index) => (
          <li key={index}>{formatInline(item)}</li>
        ))}
      </ListTag>
    );

    listItems = [];
    listType = null;
  };

  const closeCode = () => {
    if (!codeLines.length) return;

    elements.push(
      <pre key={`code-${elements.length}`}>
        <code>{codeLines.join("\n")}</code>
      </pre>
    );

    codeLines = [];
  };

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      closeList();

      if (!inCode) {
        inCode = true;
      } else {
        closeCode();
        inCode = false;
      }

      return;
    }

    if (inCode) {
      codeLines.push(line);
      return;
    }

    if (!trimmed) {
      closeList();
      return;
    }

    if (/^---+$/.test(trimmed)) {
      closeList();
      return;
    }

    const headingMatch = trimmed.match(/^#{1,6}\s+(.+)/);

    if (headingMatch) {
      closeList();

      elements.push(
        <h3 key={`heading-${elements.length}`}>
          {formatInline(
            headingMatch[1]
              .replace(/^#+\s*/, "")
              .trim()
          )}
        </h3>
      );

      return;
    }

    const bulletMatch = trimmed.match(/^[-*•]\s+(.+)/);

    if (bulletMatch) {
      if (listType !== "bullet") {
        closeList();
        listType = "bullet";
      }

      listItems.push(bulletMatch[1]);
      return;
    }

    const numberMatch = trimmed.match(/^\d+[.)]\s+(.+)/);

    if (numberMatch) {
      if (listType !== "number") {
        closeList();
        listType = "number";
      }

      listItems.push(numberMatch[1]);
      return;
    }

    closeList();

    elements.push(
      <p key={`paragraph-${elements.length}`}>
        {formatInline(trimmed)}
      </p>
    );
  });

  closeList();

  if (inCode) {
    closeCode();
  }

  return elements;
}

function AIAssistant() {
  const initialMessage = {
    type: "ai",
    text: "Hello! 👋 I'm StudyGenie AI. Ask me anything about your studies.",
  };

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("studygenieChat");

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [initialMessage];
      }
    }

    return [initialMessage];
  });

  const [loading, setLoading] = useState(false);

  const messagesRef = useRef(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, loading]);

  const sendMessage = async (e) => {
    e.preventDefault();

    const text = question.trim();

    if (!text || loading) return;

    const userMessage = {
      type: "user",
      text,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: text,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "AI request failed"
        );
      }

      const aiMessage = {
        type: "ai",
        text: data.reply,
      };

      setMessages((prev) => {
        const updated = [...prev, aiMessage];

        localStorage.setItem(
          "studygenieChat",
          JSON.stringify(updated)
        );

        return updated;
      });
    } catch (error) {
      console.error("AI Error:", error);

      const errorMessage = {
        type: "ai",
        text:
          "Sorry, I couldn't connect to the AI server. Please try again.",
      };

      setMessages((prev) => [
        ...prev,
        errorMessage,
      ]);
    } finally {
      setLoading(false);
    }
  };

  const newChat = () => {
    setMessages([initialMessage]);

    localStorage.setItem(
      "studygenieChat",
      JSON.stringify([initialMessage])
    );
  };

  return (
    <main className="assistant-content">

      <div className="assistant-top-section">
        <div>
          <span className="assistant-label">
            AI LEARNING
          </span>

          <h1>Smart AI Assistant</h1>

          <p>
            Ask questions, understand concepts and learn faster with
            your personal study assistant.
          </p>
        </div>

        <button
          className="new-chat-btn"
          onClick={newChat}
        >
          <span>✦</span>
          New Chat
        </button>
      </div>

      <div className="chat-card">

        <div className="chat-header">

          <div className="chat-title">

            <div className="chat-ai-icon">
              ✦
            </div>

            <div>
              <strong>StudyGenie AI</strong>

              <span>
                <i></i>
                Online
              </span>
            </div>

          </div>

          <span className="chat-status">
            AI Assistant
          </span>

        </div>

        <div
          className="messages"
          ref={messagesRef}
        >

          {messages.map((message, index) => (
            <div
              key={index}
              className={`assistant-message ${
                message.type === "user"
                  ? "assistant-user-message"
                  : "assistant-ai-message"
              }`}
            >

              {message.type === "ai" && (
                <div className="message-avatar">
                  ✦
                </div>
              )}

              <div className="message-content">

                <div className="message-name">
                  {message.type === "ai"
                    ? "StudyGenie AI"
                    : "You"}
                </div>

                <div className="message-bubble">
                  {message.type === "ai"
                    ? formatAIText(message.text)
                    : message.text}
                </div>

                <small>
                  {message.type === "ai"
                    ? "AI Assistant"
                    : "You"}
                  {" • "}
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </small>

              </div>

              {message.type === "user" && (
                <div className="message-avatar user-avatar">
                  👤
                </div>
              )}

            </div>
          ))}

          {loading && (
            <div className="assistant-message assistant-ai-message">

              <div className="message-avatar">
                ✦
              </div>

              <div className="message-content">

                <div className="message-name">
                  StudyGenie AI
                </div>

                <div className="message-bubble typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

              </div>

            </div>
          )}

        </div>

        <form
          className="assistant-input"
          onSubmit={sendMessage}
        >

          <input
            type="text"
            placeholder="Ask StudyGenie anything..."
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            disabled={loading}
          />

          <button
            type="button"
            className="attach-btn"
          >
            📎
          </button>

          <button
            type="submit"
            className="send-btn"
            disabled={loading}
          >
            ➤
          </button>

        </form>

        <div className="chat-footer">
          StudyGenie AI can help you understand and practice your subjects.
        </div>

      </div>

    </main>
  );
}

export default AIAssistant;