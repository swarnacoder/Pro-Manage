import { useState, useEffect } from "react";
import styles from "./Settings.module.css";
import { LeftSidebar } from "../../components/LeftSidebar/LeftSidebar";
import { useAuth } from "../../Context/auth";


export const Settings = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [settingData, setSettingData] = useState({
    name: "",
    oldPassword: "",
    newPassword: "",
  });
  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };
  const { user } = useAuth();

  // const [userData, setUserData] = useState(true);


  useEffect(() => {
    // Set initial name value from user context
    if (user) {
      setSettingData((prevData) => ({
        ...prevData,
        name: user.name,
      }));
    }
  }, [user]);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setSettingData((prev) => ({ ...prev, [name]: value }));

  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/update-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(settingData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log(response)
        alert(data.msg); // Show success message
      } else {
        alert(data.error); // Show error message
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Error updating password. Please try again.");
    }
  };

  return (
    <>
      <section className={styles.settings}>
        <LeftSidebar />
        <section className={styles.setting_container}>
          <div className={styles.setting_heading}>
            <p className={styles.heading}> Settings </p>
          </div>
          <form
            action=""
            className={styles.setting_form}
            onSubmit={handleSubmit}
          >
            {/* user  */}

            <label htmlFor="name" className={styles.labels}>
              <i className=" fa-regular fa-user"></i>
              <input
                placeholder="Name"
                className={styles.settings_form_input}
                type="text"
                name="name"
                id="name"
                required
                autoComplete="off"
                value={settingData.name}
                onChange={handleInput}
              />
            </label>

            {/* old password  */}

            <label htmlFor="oldPassword" className={styles.labels}>
              <i className="fa-solid fa-lock"></i>
              <input
                className={styles.settings_form_input}
                placeholder="Old Password"
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                required
                autoComplete="off"
                value={settingData.oldPassword}
                onChange={handleInput}
              />
              <i
                className={`fa-regular fa-eye eye-icon ${
                  showOldPassword ? "visible" : ""
                }`}
                onClick={toggleOldPasswordVisibility}
              ></i>
            </label>

            {/* new password  */}

            <label htmlFor="newPassword" className={styles.labels}>
              <i className="fa-solid fa-lock"></i>
              <input
                className={styles.settings_form_input}
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                name="newPassword"
                id="newPassword"
                required
                autoComplete="off"
                value={settingData.newPassword}
                onChange={handleInput}
              />
              <i
                className={`fa-regular fa-eye eye-icon ${
                  showNewPassword ? "visible" : ""
                }`}
                onClick={toggleNewPasswordVisibility}
              ></i>
            </label>
            <button className={styles.setting_update} type="submit">
              Update
            </button>
          </form>
        </section>
      </section>
    </>
  );
};
