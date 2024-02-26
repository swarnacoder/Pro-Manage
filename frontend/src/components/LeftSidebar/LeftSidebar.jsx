import React from "react";
import Styles from "./LeftSidebar.module.css";
import { useNavigate } from "react-router-dom";
import logout from "../../assets/icons/Logout.png";
import logo from "../../assets/icons/logo.png";
import board from "../../assets/icons/board.png";
import analytics from "../../assets/icons/analytics.png";
import settings from "../../assets/icons/settings.png";

export const LeftSidebar = () => {
  const navigate = useNavigate();

  const handleButtonClick = (page) => {
    navigate(page);
  };

  return (
    <>
      <div className={Styles.leftSidebar}>
        <div className={Styles.headerSection}>
          <img src={logo} alt="logo" Styles={{ height: "1rem" }} />
          <h1 className={Styles.heading}>Pro Manage</h1>
        </div>

        <div className={Styles.navigateContainer}>
          <div className={Styles.navigateHeader}>
            <button className={Styles.btnDashboard}>
             
              <img src={board} alt="board" Styles={{ height: "1rem" , }} />
              Board
            </button>
            <button
              className={Styles.btnAnalytics}
              onClick={() => handleButtonClick("/analytics")}
            >
              <img src={analytics} alt="analytics" Styles={{ height: "1rem" }} />
              Analytics
            </button>
            <button
              className={Styles.btnCreatequiz}
              onClick={() => handleButtonClick("/Settings")}
            >              <img src={settings} alt="settings" Styles={{ height: "1rem" }} />

              Settings
            </button>
          </div>

          <footer className={Styles.footer}>
            <img src={logout} alt="logout" />
            <button className={Styles.btnLogout}>LOGOUT</button>
          </footer>
        </div>
      </div>
    </>
  );
};
