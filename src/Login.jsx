import { useEffect, useRef, useState } from "react";
import "./Login.css";

function Login({ onBack, onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const googleButtonRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    localStorage.removeItem("studygenie_email");
    localStorage.removeItem("studygenieProfile");
    localStorage.removeItem("profilePhoto");
  }, []);

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    if (!clientId) {
      console.error("Google Client ID missing in .env");
      return;
    }

    const initializeGoogle = () => {
      if (!window.google || !googleButtonRef.current) {
        return;
      }

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleResponse,
      });

      googleButtonRef.current.innerHTML = "";

      window.google.accounts.id.renderButton(
        googleButtonRef.current,
        {
          theme: "outline",
          size: "large",
          text: "continue_with",
          shape: "rectangular",
          width: 400,
        }
      );
    };

    if (window.google) {
      initializeGoogle();
      return;
    }

    const existingScript = document.getElementById(
      "google-identity-script"
    );

    if (existingScript) {
      existingScript.addEventListener("load", initializeGoogle);

      return () => {
        existingScript.removeEventListener(
          "load",
          initializeGoogle
        );
      };
    }

    const script = document.createElement("script");

    script.id = "google-identity-script";
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogle;

    document.body.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, []);

  const decodeGoogleToken = (token) => {
    try {
      const payload = token.split(".")[1];

      const normalized = payload
        .replace(/-/g, "+")
        .replace(/_/g, "/");

      const decoded = decodeURIComponent(
        atob(normalized)
          .split("")
          .map(
            (char) =>
              "%" +
              ("00" + char.charCodeAt(0).toString(16)).slice(-2)
          )
          .join("")
      );

      return JSON.parse(decoded);
    } catch (error) {
      console.error("Token decode error:", error);
      return null;
    }
  };

  const handleGoogleResponse = (response) => {
    if (!response.credential) {
      alert("Google login failed.");
      return;
    }

    const user = decodeGoogleToken(response.credential);

    if (!user) {
      alert("Unable to read Google account.");
      return;
    }

    const profile = {
      name: user.name || "Student",
      email: user.email || "",
    };

    localStorage.setItem(
      "studygenie_email",
      profile.email
    );

    localStorage.setItem(
      "studygenieProfile",
      JSON.stringify(profile)
    );

    if (user.picture) {
      localStorage.setItem(
        "profilePhoto",
        user.picture
      );
    }

    onLogin({
      name: profile.name,
      email: profile.email,
      photoURL: user.picture || "",
      credential: response.credential,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (isSignup && !cleanName) {
      alert("Please enter your name.");
      return;
    }

    if (!cleanEmail) {
      alert("Please enter your email.");
      return;
    }

    const userName = isSignup
      ? cleanName
      : cleanEmail.split("@")[0] || "Student";

    const profile = {
      name: userName,
      email: cleanEmail,
    };

    localStorage.setItem(
      "studygenie_email",
      cleanEmail
    );

    localStorage.setItem(
      "studygenieProfile",
      JSON.stringify(profile)
    );

    if (isSignup) {
      alert("Account created successfully!");
    }

    onLogin({
      name: userName,
      email: cleanEmail,
      photoURL: "",
    });
  };

  const handleSwitch = () => {
    setIsSignup((prev) => !prev);
    setName("");
    setEmail("");
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-left">
          <div className="login-brand">
            <div className="login-brand-icon">
              <span>✦</span>
            </div>

            <span>
              StudyGenie <b>AI</b>
            </span>
          </div>

          <div className="login-welcome">
            <h1>
              {isSignup ? "Start Learning!" : "Welcome Back!"}
            </h1>

            <p>
              {isSignup
                ? "Create your account and start your learning journey."
                : "Login to access your account and continue your learning journey."}
            </p>
          </div>

          <div className="login-ai-logo">
            <div className="ai-circle">
              <div className="ai-spark">✦</div>
            </div>

            <div className="ai-ring ring-one"></div>
            <div className="ai-ring ring-two"></div>

            <div className="ai-learning-text">
              <strong>STUDY</strong>
              <span>SMARTER</span>
            </div>
          </div>
        </div>

        <div className="login-right">

          <button
            className="back-btn"
            onClick={onBack}
            type="button"
          >
            ← Back to home
          </button>

          <div className="login-header">
            <h2>
              {isSignup ? "Create your account" : "Welcome back"}
            </h2>

            <p>
              {isSignup
                ? "Create your account to continue your preparation."
                : "Sign in to continue your preparation."}
            </p>
          </div>

          {!isSignup && (
            <>
              <div
                className="google-login-container"
                ref={googleButtonRef}
              ></div>

              <div className="divider">
                <span></span>
                <small>or</small>
                <span></span>
              </div>
            </>
          )}

          <form
            onSubmit={handleSubmit}
            autoComplete="off"
          >

            {isSignup && (
              <div className="form-group">
                <label>Full Name</label>

                <input
                  type="text"
                  name="new-name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="off"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label>Email</label>

              <div className="input-wrapper">
                <span>✉</span>

                <input
                  type="email"
                  name="new-email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>

              <div className="input-wrapper">
                <span>▣</span>

                <input
                  type="password"
                  name="new-password"
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  required
                />

                <span className="password-icon">◌</span>
              </div>
            </div>

            {!isSignup && (
              <div className="login-options">
                <label className="remember">
                  <input type="checkbox" />
                  <span>Remember Me</span>
                </label>

                <button
                  type="button"
                  className="forgot-btn"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              className="submit-btn"
              type="submit"
            >
              {isSignup ? "Create Account" : "Sign in"}
            </button>
          </form>

          {isSignup && (
            <div className="divider">
              <span></span>
              <small>or</small>
              <span></span>
            </div>
          )}

          {isSignup && (
            <div
              className="google-login-container"
              ref={googleButtonRef}
            ></div>
          )}

          <p className="switch-text">
            {isSignup
              ? "Already have an account?"
              : "New to StudyGenie?"}

            <button
              className="switch-btn"
              type="button"
              onClick={handleSwitch}
            >
              {isSignup ? " Login" : " Create an account"}
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;
