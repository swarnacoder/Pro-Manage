import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import Modal from "../../components/Modal/Modal";
import { LeftSidebar } from "../../components/LeftSidebar/LeftSidebar";
import Card from "../../components/Card/Card";


export const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [todos, setTodos] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/todo");
        if (response.ok) {
          const data = await response.json();
          setTodos(data.todos);
        } else {
          console.error("Error fetching todos:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchData();
  }, []); // Run only once when the component mounts


  // const [cards, setCards] = useState([
  //   { id: 1, targetArea: 'Done' },
  //   { id: 2, targetArea: 'ToDo' },
  //   { id: 3, targetArea: 'ToDo' },
  //   { id: 4, targetArea: 'Backlog' },
  // ]);



  const openModal = () => {
    console.log("Opening modal");

    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal");

    setIsModalOpen(false);
  };

  // const handleCardMove = (cardId, newTargetArea) => {
  //   setCards((prevCards) =>
  //     prevCards.map((card) =>
  //       card.id === cardId ? { ...card, targetArea: newTargetArea } : card
  //     )
  //   );
  // };

  return (
    <>
      <section className={styles.dashboardMaincontainer}>
        <LeftSidebar />
        <section className={styles.dashboardContainer}>
          <div className={styles.navbar}>
            <p className={styles.nameHeading}> Welcome ! Jyoti </p>
            <p className={styles.date}> 21st feb, 2024 </p>
          </div>

          {/* Board heading  */}
          <div className={styles.heading}>
            <p className={styles.header}> Board </p>
            {/* drop down  */}
            <div className={styles.dropdown}>
              <select id="time" name="time">
                <option value="Today">Today</option>
                <option value="Week">This Week</option>
                <option value="Month">This Month</option>
              </select>
            </div>
          </div>

          <section className={styles.mainBoxContainer}>
            {/* <div className={styles.sectionArea}>
              {["Backlog", "ToDo", "In-Progress", "Done"].map((area) => (
                <div key={area} className={styles.areas}>
                  <div className={styles.areaHeader}>
                    <h3>{area}</h3>
                    <div className={styles.buttonArea}>
                      {area === "ToDo" && (
                        <button onClick={openModal}>+</button>
                      )}
                       <i className="fa-regular fa-copy" />
                    </div>
                  </div>
                  <div className={styles.cardArea}>
                    {cards
                      .filter((card) => card.targetArea === area)
                      .map((card) => (
                        <Card
                          key={card.id}
                          cardId={card.id}
                          targetArea={card.targetArea}
                          onCardMove={handleCardMove}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div> */}

            
            {/* BACKLOG  */}

            <div className={styles.boxContainer}>

              <div className={styles.box}>
                <p className={styles.category}>Backlog</p>
                <i className="fa-regular fa-copy" />
              </div>
            </div>
            {/* TODO  */}
            <div className={styles.boxContainer}>
              <div className={styles.box}>
                <p className={styles.category}>To Do</p>
                <div className={styles.boxIcon}>
                  <button onClick={openModal}>+</button>
                  <i className="fa-regular fa-copy" />
                </div>
                  
                {todos.map((todo) => (
              <Card key={todo._id} todo={todo} />
            ))}
              </div>
            </div>
            {/* PROGRESS  */}
            <div className={styles.boxContainer}>
              <div className={styles.box}>
                <p className={styles.category}>In Progress</p>
                <i className="fa-regular fa-copy" />
              </div>
            </div>
            {/* DONE  */}
            <div className={styles.boxContainer}>
              <div className={styles.box}>
                <p className={styles.category}>Done</p>
                <i className="fa-regular fa-copy" />
              </div>
            </div>
          </section>
        </section>
      </section>
      {isModalOpen && <Modal onClose={closeModal} />}{" "}
    </>
  );
};
