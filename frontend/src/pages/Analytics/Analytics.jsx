import React, { useState, useEffect } from "react";


import { LeftSidebar } from "../../components/LeftSidebar/LeftSidebar"
import styles from "./Analytics.module.css"
import dotIcon from "../../assets/icons/doticon.png"
import { MoonLoader } from "react-spinners";



export const Analytics = () => {
    const [analyticsData, setAnalyticsData] = useState({});

    useEffect(() => {
        const fetchAnalyticsData = async () => {
          try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:5000/api/v1/todos", {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
    
            if (response.ok) {
              const data = await response.json();
              setAnalyticsData(data.analyticsData);
            } else {
              console.error("Error fetching analytics data:", response.statusText);
            }
          } catch (error) {
            console.error("Error fetching analytics data:", error);
          }
        };
    
        fetchAnalyticsData();
      }, []);

      const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <MoonLoader color="#474444" />
      </div>
    );
  }

    return (
        <>
        <section className={styles.analytics}>
            <LeftSidebar/>
            <section className={styles.analytics_container}>
                <div className={styles.analytics_heading}>
                    <p className={styles.heading}>Analytics</p>
                </div>
                <section className={styles.analytics_content}>
                <div className={styles.categories}>
                    <div className={styles.categories_container}>
                        <p className={styles.categories_container_text}> <img src={dotIcon} alt="Blue Icon" width="10px" height="10px" /> Backlog Tasks </p>
                        <span className={styles.categories_container_num}>{analyticsData.backlogTasks}</span>

                    </div>
                    <div className={styles.categories_container}>
                        <p className={styles.categories_container_text}> <img src={dotIcon} alt="Blue Icon" width="10px" height="10px" /> To-Do Tasks </p>
                        <span className={styles.categories_container_num}>{analyticsData.todoTasks}</span>

                    </div>
                    <div className={styles.categories_container}>
                        <p className={styles.categories_container_text}> <img src={dotIcon} alt="Blue Icon" width="10px" height="10px" /> In-Progress Tasks </p>
                        <span className={styles.categories_container_num}>{analyticsData.inProgressTasks}</span>

                    </div>
                    <div className={styles.categories_container}>
                        <p className={styles.categories_container_text}> <img src={dotIcon} alt="Blue Icon" width="10px" height="10px" /> Done Tasks </p>
                        <span className={styles.categories_container_num}>{analyticsData.doneTasks}</span>

                    </div>
                </div>
                <div className={styles.priorities}>
                <div className={styles.categories_container}>
                        <p className={styles.categories_container_text}> <img src={dotIcon} alt="Blue Icon" width="10px" height="10px" /> Low Priority </p>
                        <span className={styles.categories_container_num}>{analyticsData.lowPriorityTasks}</span>

                    </div>
                <div className={styles.categories_container}>
                        <p className={styles.categories_container_text}> <img src={dotIcon} alt="Blue Icon" width="10px" height="10px" /> Moderate Priority </p>
                        <span className={styles.categories_container_num}>{analyticsData.moderatePriorityTasks}</span>

                    </div>
                <div className={styles.categories_container}>
                        <p className={styles.categories_container_text}> <img src={dotIcon} alt="Blue Icon" width="10px" height="10px" /> High Priority </p>
                        <span className={styles.categories_container_num}>{analyticsData.highPriorityTasks}</span>

                    </div>
                <div className={styles.categories_container}>
                        <p className={styles.categories_container_text}> <img src={dotIcon} alt="Blue Icon" width="10px" height="10px" /> Due Date Tasks </p>
                        <span className={styles.categories_container_num}>{analyticsData.dueDateTasks}</span>

                    </div>
                </div>
                </section>
            </section>
        </section>
        </>
    )
}
