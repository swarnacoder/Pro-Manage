import React, { useState } from "react";
import styles from "./Card.module.css";

// import more from "../../assets/icons/more.png";
import arrowUp from "../../assets/icons/arrow_up.png";
import arrowDown from "../../assets/icons/arrow_down.png";

const Card = ({ todo }) => {
  const [expand, setExpand] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <section className={styles.card_container}>
        {todo && (
          <>
            <div className={styles.card_header}>
              <p className={styles.priority}> {todo.priority} </p>
              <button className={styles.dropdownButton} onClick={handleToggle}>
                <i className="fa-solid fa-ellipsis"></i>
              </button>
              {isOpen && (
                <div className={styles.dropdownContent}>
                  <button className={styles.dropdownItemBtn} 
                  // onClick={onEdit}
                  >
                    Edit
                  </button>
                  <button className={styles.dropdownItemBtn} 
                  // onClick={onShare}
                  >
                    Share
                  </button>
                  <button className={styles.dropdownItemBtn} 
                  // onClick={onDelete}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            <div>
              <p className={styles.title}>{todo.title}</p>
            </div>
            <div className={styles.card_checklist}>
              <p className={styles.checklist}>
                {/* Checklist ({todo.checklist.length}/{todo.checklist.length}) */}
                Checklist 1/3
              </p>
              <div
                className={styles.arrowArea}
                onClick={() => setExpand(!expand)}
              >
                {expand ? (
                  <img src={arrowUp} alt="up"></img>
                ) : (
                  <img src={arrowDown} alt="down"></img>
                )}
              </div>
              {expand && (
                <ul>
                  {todo.checklist.map((item, index) => (
                    <li
                      key={index}
                      className={item.completed ? styles.completed : ""}
                    >
                      {item.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className={styles.card_categories}>
              <p className={styles.duedate}>
                {" "}
                {new Date(todo.dueDate).toLocaleDateString()}{" "}
              </p>
              <div className={styles.card_change_categories}>
                <button className={styles.categories}> BACKLOG </button>
                <button className={styles.categories}> PROGRESS </button>
                <button className={styles.categories}> DONE </button>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};
export default Card;
