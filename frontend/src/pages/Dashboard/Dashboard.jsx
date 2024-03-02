import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import Modal from "../../components/Modal/Modal";
import { LeftSidebar } from "../../components/LeftSidebar/LeftSidebar";
import Card from "../../components/Card/Card";
import { useAuth } from "../../Context/auth";
import { MoonLoader } from "react-spinners";


export const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [todos, setTodos] = useState([]);

  const deleteCard = async (cardId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/v1/todo/${cardId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const updatedTodos = todos.filter((todo) => todo._id !== cardId);
        setTodos(updatedTodos);
      } else {
        console.error("Error deleting card:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  // FOR TODO FILTER WITH CREATED DATE
  const [selectedTime, setSelectedTime] = useState("week");

  const handleTimeChange = (event) => {
    const newSelectedTime = event.target.value;
    setSelectedTime(newSelectedTime);
  };

  // Use useEffect to fetch data when the component mounts or when selectedTime changes filter for today, weeek , month
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:5000/api/v1/todos?time=${selectedTime}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
  }, [selectedTime]);

  const openModal = () => {
    console.log("Opening modal");

    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal");

    setIsModalOpen(false);
  };

  // TO GET THE USER NAME AND DATE
  const { user } = useAuth();
  const currentDate = new Date();

  const dayWithOrdinal = (date) => {
    const day = date.getDate();
    const suffix =
      day >= 11 && day <= 13
        ? "th"
        : ["th", "st", "nd", "rd", "th"][(day % 10) - 1];
    return `${day.toString().padStart(2, "0")}${suffix}`;
  };

  const options = { year: "numeric", month: "short", day: "2-digit" };

  const formattedDate = currentDate.toLocaleDateString("en-US", options);
  const formattedDateWithOrdinal = formattedDate.replace(
    dayWithOrdinal(currentDate),
    formattedDate
  );

  console.log(formattedDateWithOrdinal);

  // CATEGORY CHANGE OF CARD
  const moveCardTo = async (cardId, targetArea) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/v1/todo/${cardId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ targetArea }),
        }
      );

      if (response.ok) {
        const updatedTodos = todos.map((todo) =>
          todo._id === cardId ? { ...todo, targetArea } : todo
        );

        setTodos(updatedTodos);
      } else {
        console.error("Error moving card:", response.statusText);
      }
    } catch (error) {
      console.error("Error moving card:", error);
    }
  };

  const handleCardMove = async (cardId, targetArea) => {
    moveCardTo(cardId, targetArea);
  };


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
      <section className={styles.dashboardMaincontainer}>
        <LeftSidebar />
        <section className={styles.dashboardContainer}>
          <div className={styles.navbar}>
            <p className={styles.nameHeading}> Welcome ! {user.name} </p>
            <p className={styles.date}> {formattedDateWithOrdinal}</p>
          </div>

          {/* Board heading  */}
          <div className={styles.heading}>
            <p className={styles.header}> Board </p>
            {/* drop down  */}
            <div className={styles.dropdown}>
              <select
                id="time"
                name="time"
                onChange={handleTimeChange}
                value={selectedTime}
              >
                <option value="Month">This Month</option>
                <option value="Today">Today</option>
                <option value="Week">This Week</option>
              </select>
            </div>
          </div>

          <section className={styles.mainBoxContainer}>
            {["Backlog", "ToDo", "In Progress", "Done"].map((area) => (
              <div key={area} className={styles.boxContainer}>
                <div className={styles.box}>
                  <p className={styles.category}>{area}</p>
                  {area === "ToDo" && (
                    <div className={styles.createBtn}>
                      <button onClick={openModal} className={styles.plusbutton}>
                        +
                      </button>
                    </div>
                  )}
                  <i className="fa-regular fa-copy" />
                </div>
                <div className={styles.cardbox}>
                  {todos
                    .filter((todo) => todo.targetArea === area)
                    .map((todo) => (
                      <Card
                        key={todo._id}
                        todo={todo}
                        onCardMove={(newTargetArea) =>
                          handleCardMove(todo._id, newTargetArea)
                        }
                        onDelete={() => deleteCard(todo._id)}
                      />
                    ))}
                </div>
              </div>
            ))}
          </section>
        </section>
      </section>

      {isModalOpen && <Modal onClose={closeModal} />}
    </>
  );
};
