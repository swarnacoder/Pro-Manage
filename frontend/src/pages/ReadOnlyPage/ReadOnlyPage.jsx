// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import styles from "./ReadOnlyPage.module.css";

// export const ReadOnlyPage = () => {
//   const { id } = useParams();
//   const [todo, setTodo] = useState(null);

 

//   return (
//     <div className={styles.readonlyContainer}>
//       <h1>Readonly Todo Details</h1>
//       {todo ? (
//         <div className={styles.todoDetails}>
//           <p><strong>Title:</strong> {todo.title}</p>
//           <p><strong>Priority:</strong> {todo.priority}</p>
//           <p><strong>Due Date:</strong> {new Date(todo.dueDate).toLocaleDateString()}</p>
//           <div className={styles.checklist}>
//             <p><strong>Checklist:</strong></p>
//             <ul>
//               {todo.checklist.map((item, index) => (
//                 <li key={index} className={item.completed ? styles.completed : ""}>
//                   {item.text}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

 