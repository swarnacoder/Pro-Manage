import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./ReadOnlyPage.module.css";
import Logo from "../../assets/icons/logo.png";

const ReadOnlyPage = () => {
  const { _id } = useParams(); 
  const [cardData, setCardData] = useState("");
console.log(cardData._id)

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch(`http://localhost:5000/api/v1/todo/${_id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCardData(data.todo);
          console.log(data.todo)

        } else {
          console.error("Error fetching card data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    fetchCardData();
  }, [_id]);

  if (!cardData) {
    return (
      <div className={styles.loadingContainer}>
        <p>Loading...</p>
      </div>
    );
  }
const { priority, title, checklist, dueDate } = cardData;


  return (
    <>
      <section className={styles.userCard}>
        <section className={styles.header_section}>
          <div className={styles.header}>
            <img src={Logo} alt="Promanage Logo" height="24px" width="24px" />
            <p>Pro Manage</p>
          </div>
        </section>
        <section className={styles.usercard_container}>
          <div className={styles.main_container}>
            <div className={styles.priority}>
              <p className={styles.priority_container}>
                <span className={styles.priority_text}>
                  {priority} Priority
                </span>{" "}
              </p>
              <span className={styles.card_title}> {title}</span>
            </div>
            <div className={styles.checklist}>
              <p className={styles.checklist_text}>
                {" "}
                Checklist (
                    {checklist && checklist.filter((item) => item.completed).length}/
            {checklist && checklist.length})
              </p>
              <div className={styles.scrollarea}>
                <div className={styles.checklist_container}>



                {checklist &&
                checklist.map((item) => (
                  <label className={styles.checklist_tasks} key={item._id}>
                    <input
                      className={styles.task_check}
                      type="checkbox"
                      checked={item.completed}
                      readOnly
                    />
                    <input
                      className={styles.task}
                      type="text"
                      name="tasks"
                      value={item.text}
                      readOnly
                    />
                  </label>
                ))}


                </div>
              </div>
            </div>

            <div className={styles.dueDate}>
              <p className={styles.dueDate_text}> Due Date </p>
              <p className={styles.get_date}>  {dueDate && new Date(dueDate).toLocaleDateString()}</p>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};
export default ReadOnlyPage;



