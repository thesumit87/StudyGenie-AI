import { useState } from "react";
import "./Login.css";

function Login({ onBack, onLogin }) {
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
  alert("Account created successfully!");
} else {
  onLogin();
}
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>

        <div className="login-logo">🎓</div>

        <h1>{isSignup ? "Create Account" : "Welcome Back!"}</h1>

        <p>
          {isSignup
            ? "Create your StudyGenie account"
            : "Login to continue your learning journey"}
        </p>

        <form onSubmit={handleSubmit}>

          {isSignup && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button className="submit-btn" type="submit">
            {isSignup ? "Create Account" : "Login"}
          </button>

        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <button className="google-btn">
          🔵 Continue with Google
        </button>

        <p className="switch-text">
          {isSignup
            ? "Already have an account?"
            : "Don't have an account?"}

          <button
            className="switch-btn"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? " Login" : " Sign Up"}
          </button>
        </p>

      </div>
    </div>
  );
}

export default Login;