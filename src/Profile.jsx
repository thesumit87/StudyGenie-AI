import { useRef, useState } from "react";
import "./Profile.css";

function Profile({ onBack, onLogout }) {
  const defaultProfile = {
    name: "Student",
    email: "student@example.com",
    learningMode: "Student",
    subjects: ["Java", "DBMS", "Operating System"],
  };

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("studygenieProfile");

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultProfile;
      }
    }

    return defaultProfile;
  });

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [editing, setEditing] = useState(false);

  const [photo, setPhoto] = useState(
    localStorage.getItem("profilePhoto") || ""
  );

  const [learningMode, setLearningMode] = useState(
    profile.learningMode
  );

  const [subjects, setSubjects] = useState(
    profile.subjects || []
  );

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const fileInputRef = useRef(null);

  const notifyDashboard = () => {
    window.dispatchEvent(
      new Event("studygenie-update")
    );
  };

  const saveProfile = () => {
    const updatedProfile = {
      name: name.trim() || "Student",
      email: email.trim() || "student@example.com",
      learningMode,
      subjects,
    };

    setProfile(updatedProfile);

    localStorage.setItem(
      "studygenieProfile",
      JSON.stringify(updatedProfile)
    );

    setName(updatedProfile.name);
    setEmail(updatedProfile.email);
    setEditing(false);

    notifyDashboard();
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const changePhoto = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const image = reader.result;

      setPhoto(image);

      localStorage.setItem(
        "profilePhoto",
        image
      );

      notifyDashboard();
    };

    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPhoto("");

    localStorage.removeItem("profilePhoto");

    notifyDashboard();
  };

  const changeLearningMode = () => {
    const newMode =
      learningMode === "Student"
        ? "Exam Preparation"
        : "Student";

    setLearningMode(newMode);

    const updatedProfile = {
      ...profile,
      name: name.trim() || "Student",
      email: email.trim() || "student@example.com",
      learningMode: newMode,
      subjects,
    };

    setProfile(updatedProfile);

    localStorage.setItem(
      "studygenieProfile",
      JSON.stringify(updatedProfile)
    );

    notifyDashboard();
  };

  const changeSubjects = () => {
    const value = prompt(
      "Enter subjects separated by commas:",
      subjects.join(", ")
    );

    if (!value) {
      return;
    }

    const newSubjects = value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    if (newSubjects.length === 0) {
      return;
    }

    setSubjects(newSubjects);

    const updatedProfile = {
      ...profile,
      name: name.trim() || "Student",
      email: email.trim() || "student@example.com",
      learningMode,
      subjects: newSubjects,
    };

    setProfile(updatedProfile);

    localStorage.setItem(
      "studygenieProfile",
      JSON.stringify(updatedProfile)
    );

    notifyDashboard();
  };

  const savePassword = () => {
    if (!password || !confirmPassword) {
      alert("Please enter both password fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    alert("Password changed successfully.");

    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
  };

  return (
    <div className="profile-page">

      <main className="profile-main">

        <div className="profile-page-heading">
          <div>
            <span>ACCOUNT</span>

            <h1>👤 My Profile</h1>

            <p>
              Manage your account and learning preferences
            </p>
          </div>
        </div>

        <section className="profile-card">

          <div className="photo-area">

            <div className="profile-avatar">

              {photo ? (
                <img
                  src={photo}
                  alt="Profile"
                />
              ) : (
                "👤"
              )}

            </div>

            <button
              type="button"
              className="change-photo-btn"
              onClick={openFilePicker}
            >
              Change Photo
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={changePhoto}
              className="photo-input"
            />

            {photo && (
              <button
                type="button"
                className="remove-photo-btn"
                onClick={removePhoto}
              >
                Remove
              </button>
            )}

          </div>

          <div className="profile-info">

            <span className="member-label">
              STUDYGENIE MEMBER
            </span>

            {editing ? (
              <div className="edit-fields">

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Name"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Email"
                />

              </div>
            ) : (
              <>
                <h2>{name}</h2>

                <p>{email}</p>

                <span className="learning-badge">
                  ✦ {learningMode}
                </span>
              </>
            )}

          </div>

          <button
            type="button"
            className="edit-profile-btn"
            onClick={() => {
              if (editing) {
                saveProfile();
              } else {
                setEditing(true);
              }
            }}
          >
            {editing ? "Save Profile" : "Edit Profile"}
          </button>

        </section>

        <section className="profile-section">

          <div className="section-heading">
            <span>PERSONALIZE</span>
            <h2>Learning Preferences</h2>
          </div>

          <div className="preferences-grid">

            <button
              type="button"
              className="preference-card"
              onClick={changeLearningMode}
            >
              <div className="preference-icon">
                🎓
              </div>

              <div className="preference-info">
                <strong>Learning Mode</strong>
                <p>{learningMode}</p>
              </div>

              <span className="preference-action">
                Change →
              </span>
            </button>

            <button
              type="button"
              className="preference-card"
              onClick={changeSubjects}
            >
              <div className="preference-icon blue">
                📚
              </div>

              <div className="preference-info">
                <strong>Preferred Subjects</strong>

                <p>
                  {subjects.length > 0
                    ? subjects.join(", ")
                    : "No subjects added"}
                </p>
              </div>

              <span className="subject-count">
                {subjects.length}
              </span>
            </button>

          </div>

        </section>

        <section className="profile-section account-section">

          <div className="section-heading">
            <span>SECURITY</span>
            <h2>Account Settings</h2>
          </div>

          <div className="account-card">

            <button
              type="button"
              className="account-action"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              🔒
              <span>
                <strong>Change Password</strong>
                <small>
                  Update your account password
                </small>
              </span>
              <b>→</b>
            </button>

            {showPassword && (
              <div className="password-box">

                <input
                  type="password"
                  placeholder="New password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                />

                <button
                  type="button"
                  className="save-password-btn"
                  onClick={savePassword}
                >
                  Save Password
                </button>

              </div>
            )}

            <button
              type="button"
              className="logout-profile-btn"
              onClick={onLogout}
            >
              ↪ Logout
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Profile;