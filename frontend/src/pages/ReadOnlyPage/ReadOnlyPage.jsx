import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./ReadOnlyPage.module.css";

export const ReadOnlyPage = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    const fetchTodoDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/todo/share/${id}`);
        if (response.ok) {
          const data = await response.json();
          setTodo(data.todo);
        } else {
          console.error("Error fetching shared todo details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching shared todo details:", error);
      }
    };

    fetchTodoDetails();
  }, [id]);

  return (
    <div className={styles.readonlyContainer}>
      <h1>Readonly Todo Details</h1>
      {todo ? (
        <div className={styles.todoDetails}>
          <p><strong>Title:</strong> {todo.title}</p>
          <p><strong>Priority:</strong> {todo.priority}</p>
          <p><strong>Due Date:</strong> {new Date(todo.dueDate).toLocaleDateString()}</p>
          <div className={styles.checklist}>
            <p><strong>Checklist:</strong></p>
            <ul>
              {todo.checklist.map((item, index) => (
                <li key={index} className={item.completed ? styles.completed : ""}>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

 