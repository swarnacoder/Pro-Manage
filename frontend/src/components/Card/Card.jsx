import React, { useState } from "react";
import styles from "./Card.module.css";

import more from "../../assets/icons/more.png";
import arrowUp from "../../assets/icons/arrow_up.png";
import arrowDown from "../../assets/icons/arrow_down.png";

const Card = ({ todo }) => {
  const [expand, setExpand] = useState(false);

  return (
    <>
      <section className={styles.card_container}>
        <div className={styles.card_header}>
          <p className={styles.priority}> {todo.priority} </p>
          <img
            src={more}
            alt="Gives you some extra oprions"
            height="8rem"
            width="20rem"
          />
        </div>
        <div>
          <p className={styles.title}>{todo.title}</p>
        </div>
        <div className={styles.card_checklist}>
          <p className={styles.checklist}>
         
            Checklist ({todo.checklist.length}/{todo.checklist.length})
          </p>
          <div className={styles.arrowArea} onClick={() => setExpand(!expand)}>
            {expand ? (
              <img src={arrowUp} alt="up"></img>
            ) : (
              <img src={arrowDown} alt="down"></img>
            )}
          </div>
          {expand && (
            <div className={styles.checklistContent}>
              {todo.checklist.map((item, index) => (
                <p key={index}>{item.text}</p>
              ))}
            </div>
          )}
        </div>
        <div className={styles.card_categories}>
        <p className={styles.duedate}>Due Date: {todo.dueDate}</p>
          <div className={styles.card_change_categories}>
            <button className={styles.categories}> BACKLOG </button>
            <button className={styles.categories}> PROGRESS </button>
            <button className={styles.categories}> DONE </button>
          </div>
        </div>
      </section>
    </>
  );
};
export default Card;
