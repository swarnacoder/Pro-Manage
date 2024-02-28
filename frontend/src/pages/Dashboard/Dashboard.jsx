import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import Modal from "../../components/Modal/Modal";
import { LeftSidebar } from "../../components/LeftSidebar/LeftSidebar";
import Card from "../../components/Card/Card";
import { useAuth } from "../../Context/auth";

export const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [todos, setTodos] = useState([]);


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/api/v1/todos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
          
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

  // const [allTasks, setAllTasks] = useState([]);

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       const response = await fetch("http://localhost:5000/api/v1/todo/todos");
  //       if (response.ok) {
  //         const data = await response.json();
  //         setAllTasks(data.todos); // Assuming the response has a todos array
  //       } else {
  //         console.error("Failed to fetch tasks:", response.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching tasks:", error);
  //     }
  //   };

  //   fetchTasks();
  // }, [])

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

// TO GET THE USER NAME AND DATE 
const { user } = useAuth();
const currentDate = new Date();

// Format day with ordinal suffix (e.g., 1st, 2nd, 3rd, 4th)
const dayWithOrdinal = (date) => {
  const day = date.getDate();
  const suffix = (day >= 11 && day <= 13) ? 'th' : ['th', 'st', 'nd', 'rd', 'th'][day % 10 - 1];
  return `${day.toString().padStart(2, '0')}${suffix}`; // Ensure two-digit representation
};

// Set options for day (2-digit) and month (short)
const options = { year: 'numeric', month: 'short', day: '2-digit' };

const formattedDate = currentDate.toLocaleDateString('en-US', options);
const formattedDateWithOrdinal = formattedDate.replace(dayWithOrdinal(currentDate), formattedDate);

console.log(formattedDateWithOrdinal); 





// MOVE CARD FROMM CATEGORY TO CATEGORY 

// const moveCardTo = async (cardId, targetArea) => {
//   try {
//     const response = await fetch(`http://localhost:5000/api/v1/todo/${cardId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ targetArea }),
//     });

//     if (response.ok) {
//       const updatedTodos = todos.map((todo) =>
//         todo._id === cardId ? { ...todo, targetArea } : todo
//       );

//       setTodos(updatedTodos);
//     } else {
//       console.error("Error moving card:", response.statusText);
//     }
//   } catch (error) {
//     console.error("Error moving card:", error);
//   }
// };
// const handleCardMove = (cardId, targetArea) => {
//   moveCardTo(cardId, targetArea);
// };



  return (
    <>
      <section className={styles.dashboardMaincontainer}>
        <LeftSidebar />
        <section className={styles.dashboardContainer}>
          <div className={styles.navbar}>
            <p className={styles.nameHeading}> Welcome !  {user.name} </p>
            <p className={styles.date}> { formattedDateWithOrdinal }</p>
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
                  <button onClick={openModal} className={styles.plusbutton}> +</button>
                  <i className="fa-regular fa-copy" />
                </div>
              </div>
              <div className={styles.cardbox}>
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
         




          {/* <section className={styles.mainBoxContainer}>
            <div className={styles.boxContainer}>
              <div className={styles.box}>
                <p className={styles.category}>To Do</p>
                <div className={styles.boxIcon}>
                  <button onClick={openModal} className={styles.plusbutton}>
                    {" "}
                    +
                  </button>
                  <i className="fa-regular fa-copy" />
                </div>
              </div>
              <div className={styles.cardbox}>
                {todos.map((todo) => (
                  <Card
                    key={todo._id}
                    todo={todo}
                    onCardMove={(targetArea) => handleCardMove(todo._id, targetArea)}
                  />
                ))}
              </div>
            </div>
          </section> */}


          </section>

        </section>
      </section>





      {isModalOpen && <Modal onClose={closeModal} />}
    </>
  );
};
