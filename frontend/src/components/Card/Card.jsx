import React, { useState } from "react";
import styles from "./Card.module.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Card = ({ todo, onCardMove, onDelete }) => {
  const [expand, setExpand] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  const handleToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleMoveButtonClick = (newTargetArea) => {
    onCardMove(newTargetArea);
  };

  // share task
  const anonymousLink = `/${todo._id}/readOnly`;

  const shareTask = async () => {
    try {
      navigator.clipboard.writeText(window.location.origin + anonymousLink);
      setCopied(true);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      console.error("Error copying link to clipboard:", error);
      toast.error("Failed to copy link to clipboard");
    }
  };

  // LOGIC FOR DUE DATE BACKGROUND COLOR
  const isDueDatePassed = new Date(todo.dueDate) === new Date();
  const dueDateClass = isDueDatePassed ? styles.dueDateRed : styles.dueDateGrey;

  return (
    <>
      <section
        className={`${styles.card_container} ${expand && styles.expanded}`}
      >
        {todo && (
          <>
            <div className={styles.card_header}>
              <p className={styles.priority}> {todo.priority} </p>
              <div className={styles.more_Icon} onClick={handleToggle}>
                <button className={styles.dropdownButton}>
                  <i className="fa-solid fa-ellipsis"></i>
                </button>
                {isOpen && (
                  <div className={styles.dropdownContent}>
                    <div className={styles.modal_content}>
                      <button
                        className={styles.dropdownItemBtn}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.dropdownItemBtn}
                        onClick={shareTask}
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
                          <div
                            onClick={toggleModal}
                            className={styles.overlay}
                          ></div>
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
                  </div>
                )}
              </div>
            </div>
            <div>
              <p className={styles.title}>{todo.title}</p>
            </div>

          
            <div className={styles.card_checklist}>
              <h4>
                Checklist(
                {todo.checklist.filter((item) => item.completed).length}/
                {todo.checklist.length})
              </h4>

              <div
                className={styles.arrowArea}
                onClick={() => setExpand(!expand)}
              >
                {expand ? (
                  <div className="arrowUp">
                    <i
                      className="fa-solid fa-chevron-down fa-flip-vertical"
                      style={{
                        color: "#767575",
                        backgroundColor: "#EEECEC",
                        placeItems: "center",
                      }}
                    ></i>
                  </div>
                ) : (
                  <div className="arrowDown">
                    <i
                      className="fa-solid fa-chevron-down"
                      style={{
                        color: "#767575",
                        backgroundColor: "#EEECEC",
                        placeItems: "center",
                      }}
                    ></i>
                  </div>
                )}
              </div>
            </div>
            {expand && (
              <div
                className={`${styles.expand_area_content} ${
                  expand && styles.expanded_content
                }`}
              >
                {todo.checklist.map((cardItem) => (
                  <div key={cardItem._id} className={styles.expandArea}>
                    <input
                      className={styles.checkboxArea}
                      type="checkbox"
                      checked={cardItem.completed}
                      readOnly
                    />
                    <p
                      className={styles.inputArea}
                      style={{ marginLeft: "10px" }}
                    >
                      {cardItem.text}
                    </p>
                  </div>
                ))}
              </div>
            )}

            
            <div
              className={`${styles.card_categories} ${
                expand && styles.expanded_card_categories
              }`}
            >
              {todo.dueDate && (
                <p className={`${styles.duedate} ${dueDateClass}`}>
                  {new Date(todo.dueDate).toLocaleDateString()}
                </p>
              )}

             

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
      {copied && (
        <div style={{ display: "none" }}>
        
          <input
            id="readOnlyLink"
            defaultValue={window.location.origin + anonymousLink}
          />
        </div>
      )}
      <ToastContainer />
    </>
  );
};
export default Card;
