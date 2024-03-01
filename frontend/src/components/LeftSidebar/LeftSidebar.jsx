import React, { useState } from "react";
import styles from "./LeftSidebar.module.css";
import { useNavigate } from "react-router-dom";
import logout from "../../assets/icons/Logout.png";
import logo from "../../assets/icons/logo.png";
import board from "../../assets/icons/board.png";
import analytics from "../../assets/icons/analytics.png";
import settings from "../../assets/icons/settings.png";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/auth";

export const LeftSidebar = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const handleButtonClick = (page) => {
    navigate(page);
  };
  const toggleModal = () => {
    setModal(!modal);
  };

  const { LogoutUser } = useAuth();

  const handleLogout = () => {
    LogoutUser();
    toggleModal(); 
  };

  return (
    <>
      <div className={styles.leftSidebar}>
        <div className={styles.headerSection}>
          <img src={logo} alt="logo" styles={{ height: "1rem" }} />
          <h1 className={styles.heading}>Pro Manage</h1>
        </div>

        <div className={styles.navigateContainer}>
          <div className={styles.navigateHeader}>
            <button
              className={styles.btnDashboard}
              onClick={() => handleButtonClick("/dashboard")}
            >
              <img src={board} alt="board" styles={{ height: "1rem" }} />
              Board
            </button>
            <button
              className={styles.btnAnalytics}
              onClick={() => handleButtonClick("/analytics")}
            >
              <img
                src={analytics}
                alt="analytics"
                styles={{ height: "1rem" }}
              />
              Analytics
            </button>
            <button
              className={styles.btnCreatequiz}
              onClick={() => handleButtonClick("/Settings")}
            >
              {" "}
              <img src={settings} alt="settings" styles={{ height: "1rem" }} />
              Settings
            </button>
          </div>

          <footer className={styles.footer}>
            <button onClick={toggleModal} className={styles.btnLogout}>
              <img src={logout} alt="logout" />
              Log out
            </button>
            {modal && (
              <div className={styles.modal}>
                <div onClick={toggleModal} className={styles.overlay}></div>
                <div className={styles.modal_container}>
                  <p className={styles.modal_text}>
                    Are you sure you want to Logout?
                  </p>
                  <div className={styles.modal_buttons}>
                    <button
                      onClick={handleLogout}
                      className={styles.modal_logout}
                    >
                      <NavLink className={styles.modal_logout} to="/login">
                        Yes, Logout
                      </NavLink>
                    </button>
                    <button
                      className={styles.modal_cancel}
                      onClick={toggleModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </footer>
        </div>
      </div>
    </>
  );
};
