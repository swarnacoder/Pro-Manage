import React, { useState } from "react";
import styles from "./Card.module.css";

// import more from "../../assets/icons/more.png";
import arrowUp from "../../assets/icons/arrow_up.png";
import arrowDown from "../../assets/icons/arrow_down.png";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Card = ({ todo, onCardMove, onDelete }) => {
  const [expand, setExpand] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // category move WORKING CODE
  const handleMoveButtonClick = (newTargetArea) => {
    onCardMove(newTargetArea);
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
                  <button
                    className={styles.dropdownItemBtn}
                    // onClick={onEdit}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.dropdownItemBtn}
                  >
                    Share
                  </button>
                  <button
                    className={styles.dropdownItemBtn}
                    onClick={toggleModal}
                  >
                    Delete
                  </button>
                  {modal && (
              <div className={styles.modal}>
                <div onClick={toggleModal} className={styles.overlay}></div>
                <div className={styles.modal_container}>
                  <p className={styles.modal_text}>
                    Are you sure you want to Delete?
                  </p>
                  <div className={styles.modal_buttons}>
                    <button
                    onClick={onDelete}
                    className={styles.modal_logout}
                    >
                        Yes, Delete
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
              {todo.dueDate && (
                <p className={styles.duedate}>
                  {new Date(todo.dueDate).toLocaleDateString()}
                </p>
              )}

              {/* WORKING CODE  */}
              
              <div className={styles.card_change_categories}>
                {todo.targetArea === "ToDo" && (
                  <>
                    <button
                      className={styles.categories}
                      onClick={() => handleMoveButtonClick("Backlog")}
                    >
                      BACKLOG
                    </button>
                    <button
                      className={styles.categories}
                      onClick={() => handleMoveButtonClick("In Progress")}
                    >
                      IN PROGRESS
                    </button>
                    <button
                      className={styles.categories}
                      onClick={() => handleMoveButtonClick("Done")}
                    >
                      DONE
                    </button>
                  </>
                )}
                {todo.targetArea === "In Progress" && (
                  <>
                    <button
                      className={styles.categories}
                      onClick={() => handleMoveButtonClick("Backlog")}
                    >
                      BACKLOG
                    </button>
                    <button
                      className={styles.categories}
                      onClick={() => handleMoveButtonClick("ToDo")}
                    >
                      TO DO
                    </button>
                    <button
                      className={styles.categories}
                      onClick={() => handleMoveButtonClick("Done")}
                    >
                      DONE
                    </button>
                  </>
                )}
                {todo.targetArea === "Done" && (
                  <>
                    <button
                      className={styles.categories}
                      onClick={() => handleMoveButtonClick("Backlog")}
                    >
                      BACKLOG
                    </button>
                    <button
                      className={styles.categories}
                      onClick={() => handleMoveButtonClick("ToDo")}
                    >
                      TO DO
                    </button>
                    <button
                      className={styles.categories}
                      onClick={() => handleMoveButtonClick("In Progress")}
                    >
                      IN PROGRESS
                    </button>
                  </>
                )}
                {todo.targetArea === "Backlog" && (
                  <>
                    <button
                      className={styles.categories}
                      onClick={() => handleMoveButtonClick("Done")}
                    >
                      Done
                    </button>
                    <button
                      className={styles.categories}
                      onClick={() => handleMoveButtonClick("ToDo")}
                    >
                      TO DO
                    </button>
                    <button
                      className={styles.categories}
                      onClick={() => handleMoveButtonClick("In Progress")}
                    >
                      IN PROGRESS
                    </button>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </section>
      <ToastContainer />
    </>
  );
};
export default Card;
