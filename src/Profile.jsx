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
    const savedProfile =
      localStorage.getItem("studygenieProfile");

    if (savedProfile) {
      try {
        return JSON.parse(savedProfile);
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
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const fileInputRef = useRef(null);

  /* ============================= */
  /* Update Dashboard */
  /* ============================= */

  const notifyDashboard = () => {
    window.dispatchEvent(
      new Event("studygenie-update")
    );
  };

  /* ============================= */
  /* Save Profile */
  /* ============================= */

  const saveProfile = () => {
    const updatedProfile = {
      name: name.trim() || "Student",
      email:
        email.trim() ||
        "student@example.com",
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

  /* ============================= */
  /* Photo */
  /* ============================= */

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
      const image =
        reader.result;

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

    localStorage.removeItem(
      "profilePhoto"
    );

    notifyDashboard();
  };

  /* ============================= */
  /* Learning Mode */
  /* ============================= */

  const changeLearningMode = () => {
    const newMode =
      learningMode === "Student"
        ? "Exam Preparation"
        : "Student";

    setLearningMode(newMode);

    const updatedProfile = {
      ...profile,
      name:
        name.trim() || "Student",
      email:
        email.trim() ||
        "student@example.com",
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

  /* ============================= */
  /* Subjects */
  /* ============================= */

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
      .filter(
        (item) => item !== ""
      );

    if (newSubjects.length === 0) {
      return;
    }

    setSubjects(newSubjects);

    const updatedProfile = {
      ...profile,
      name:
        name.trim() || "Student",
      email:
        email.trim() ||
        "student@example.com",
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

  /* ============================= */
  /* Password */
  /* ============================= */

  const savePassword = () => {
    if (
      !password ||
      !confirmPassword
    ) {
      alert(
        "Please enter both password fields."
      );
      return;
    }

    if (
      password !==
      confirmPassword
    ) {
      alert(
        "Passwords do not match."
      );
      return;
    }

    alert(
      "Password changed successfully."
    );

    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
  };

  return (
    <div className="profile-page">

      {/* ============================= */}
      {/* Header */}
      {/* ============================= */}

      <header className="profile-header">

        <button
          type="button"
          className="profile-back-btn"
          onClick={onBack}
        >
          ← Dashboard
        </button>

        <div className="profile-title">

          <h1>
            👤 My Profile
          </h1>

          <p>
            Manage your account and
            learning preferences
          </p>

        </div>

      </header>

      <main className="profile-main">

        {/* ============================= */}
        {/* Profile Card */}
        {/* ============================= */}

        <section className="profile-card">

          {/* Photo */}

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
              onClick={
                openFilePicker
              }
            >
              Change Photo
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={
                changePhoto
              }
              className="photo-input"
            />

            {photo && (

              <button
                type="button"
                className="remove-photo-btn"
                onClick={
                  removePhoto
                }
              >
                Remove Photo
              </button>

            )}

          </div>

          {/* Profile Information */}

          <div className="profile-info">

            {editing ? (

              <>

                <label>
                  Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                />

                <label>
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                />

              </>

            ) : (

              <>

                <h2>
                  {name}
                </h2>

                <p>
                  {email}
                </p>

                <span>
                  {learningMode}
                </span>

              </>

            )}

          </div>

          {/* Edit */}

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
            {editing
              ? "Save"
              : "Edit Profile"}
          </button>

        </section>

        {/* ============================= */}
        {/* Learning Preferences */}
        {/* ============================= */}

        <section className="profile-section">

          <h2>
            Learning Preferences
          </h2>

          <button
            type="button"
            className="preference-card"
            onClick={
              changeLearningMode
            }
          >

            <div>

              <strong>
                🎓 Learning Mode
              </strong>

              <p>
                {learningMode}
              </p>

            </div>

            <span>
              Change
            </span>

          </button>

          <button
            type="button"
            className="preference-card"
            onClick={
              changeSubjects
            }
          >

            <div>

              <strong>
                📚 Preferred Subjects
              </strong>

              <p>
                {subjects.length > 0
                  ? subjects.join(", ")
                  : "No subjects added"}
              </p>

            </div>

            <span>
              {subjects.length}{" "}
              Subjects
            </span>

          </button>

        </section>

        {/* ============================= */}
        {/* Account */}
        {/* ============================= */}

        <section className="profile-section">

          <h2>
            Account
          </h2>

          <div className="account-card">

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              🔒 Change Password
            </button>

            {showPassword && (

              <div className="password-box">

                <input
                  type="password"
                  placeholder="New password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                />

                <input
                  type="password"
                  placeholder="Confirm password"
                  value={
                    confirmPassword
                  }
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                />

                <button
                  type="button"
                  className="save-password-btn"
                  onClick={
                    savePassword
                  }
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
              🚪 Logout
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Profile;