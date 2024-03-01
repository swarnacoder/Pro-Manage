import React, { useState } from "react";
import styles from "./Modal.module.css";
// import { useAuth } from "../../Context/auth";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Modal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    selectedPriority: "High", 
    dueDate: "",
    // checklistItems: [{ text: "", completed: false }],
    checklistItems: [],
  });
  const [showChecklistItems, setShowChecklistItems] = useState(false);

  // const { user, storeTokenInLS } = useAuth();
  const token = localStorage.getItem("token");

  // const [selectedPriority, setSelectedPriority] = useState();
  // const [checklistItems, setChecklistItems] = useState([
  //   { text: "", completed: false }, // Initial checklist item
  // ]);

  const handleChecklistChange = (index, event) => {
    const updatedChecklist = formData.checklistItems.map((item, i) =>
      i === index ? { ...item, completed: event.target.checked } : item
    );
    setFormData({ ...formData, checklistItems: updatedChecklist });
  };

  const handleAddItem = () => {
    setShowChecklistItems(true);

    setFormData({
      ...formData,
      checklistItems: [
        ...formData.checklistItems,
        { text: "", completed: false },
      ],
    });
  };

  const checkedCount = formData.checklistItems.reduce(
    (count, item) => (item.completed ? count + 1 : count),
    0
  );

  const handleDeleteItem = (index) => {
    const updatedChecklist = formData.checklistItems.filter(
      (item, i) => i !== index
    );
    setFormData({ ...formData, checklistItems: updatedChecklist });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log("Field Name:", name, "Value:", value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { title, dueDate, selectedPriority, checklistItems } = formData;

    // Due Date Validation
    const currentDate = new Date();
    const selectedDate = new Date(dueDate);
    const oneDayLater = new Date(
      currentDate.setDate(currentDate.getDate() + 1)
    );
    if (selectedDate < oneDayLater) {
      console.error(
        "Due date must be at least one day more than the current date."
      );
      return;
    }

    // Checklist Item Validation
    const hasEmptyChecklistItem = checklistItems.some(
      (item) => item.text.trim() === ""
    );
    if (hasEmptyChecklistItem) {
      console.error(
        "Please enter your task to be done for all checklist items."
      );
      return;
    }

    console.log("Form Data:", formData);
    // Check if a priority is selected
    if (!selectedPriority) {
      console.error("Please select a priority.");
      return; // Stop form submission if priority is not selected
    }
    // Create checklist array
    const checklist = checklistItems.map((item) => ({
      text: item.text,
      completed: item.completed || false, // Make sure to include both checked and unchecked tasks
    }));
    try {
      const response = await fetch("http://localhost:5000/api/v1/todo/new", {
        method: "POST",
        body: JSON.stringify({
          title,
          priority: selectedPriority,
          checklist,
          dueDate,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        onClose();
      } else {
        console.error("Error creating todo:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating todo:", error);
    }

// ERROR HANDELLING 
if (!title.trim()) {
  toast.error("Please enter the title.");
  return;
}

// Check if a priority is selected
if (!selectedPriority) {
  toast.error("Please select a priority.");
  return;
}

// Check if checklist is empty
if (checklistItems.length === 0) {
  toast.error("Please add a checklist.");
  return;
}


  };

  return (
    <>
      <div className={styles.modalContainer}>
        <div className={styles.overlay}></div>
        <div className={styles.modalContent}>
          <form onSubmit={handleSubmit} className={styles.modal_form}>
            <div className={styles.title_head}>
              <label className={styles.priority_text} htmlFor="">
                Title <span style={{color: "red"}}>*</span>
              </label>
              <input
                className={styles.title}
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter Task Title"
              />
            </div>

            <div className={styles.priorityContainer}>
              <label className={styles.priority_text}>Select Priority <span style={{color: "red"}}>*</span> </label>
              {["High", "Moderate", "Low"].map((priority) => (
                <button
                  key={priority}
                  type="button"
                  className={`${styles.priorityButton} ${
                    formData.selectedPriority === priority && styles.selected
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, selectedPriority: priority })
                  }
                >
                  {priority === "High" && (
                    <i
                      className="fa-solid fa-circle fa-xs "
                      style={{ color: "#FF2473" }}
                    />
                  )}
                  {priority === "Moderate" && (
                    <i
                      className="fa-solid fa-circle fa-xs "
                      style={{ color: "#18B0FF" }}
                    />
                  )}
                  {priority === "Low" && (
                    <i
                      className="fa-solid fa-circle fa-xs "
                      style={{ color: "#63C05B" }}
                    />
                  )}
                  {priority} Priority
                </button>
              ))}
            </div>

            <div className={styles.checklist}>
              <p>
                Checklist ({checkedCount} / {formData.checklistItems.length})
                <span style={{color: "red"}}> *</span>
              </p>
              {showChecklistItems && (
                <div className={styles.checklist_section}>
                  {formData.checklistItems.map((item, index) => (
                    <div key={index} className={styles.checklistItem}>
                      <label htmlFor="" className="checklist_input_label">
                        <input
                          className={styles.checklist_Input}
                          type="checkbox"
                          checked={item.completed}
                          onChange={(e) => handleChecklistChange(index, e)}
                        />

                        <input
                          type="text"
                          name={`checklist[${index}]`}
                          value={item.text}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              checklistItems: formData.checklistItems.map(
                                (prevItem, i) =>
                                  i === index
                                    ? { ...prevItem, text: e.target.value }
                                    : prevItem
                              ),
                            })
                          }
                          placeholder="Task To Be Done"
                          className={styles.checklistItemInput}
                        />
                      </label>

                      <i
                        className="fa-solid fa-trash"
                        style={{ color: "#da200b" }}
                        onClick={() => handleDeleteItem(index)}
                      ></i>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={handleAddItem}
              className={styles.addchecklist}
            >
              <span>+</span> Add New
            </button>
            <div className={styles.modal_btns}>
              <input
                type="date"
                name="dueDate"
                id="dueDate"
                className={styles.date_btn}
                value={formData.dueDate}
                onChange={handleChange}
                placeholder="Select Due Date"
              />

              <div className={styles.modal_btn}>
                <button className={styles.cancel_btn} onClick={onClose}>
                  Cancel
                </button>
                <button className={styles.save_btn} type="submit">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
};
export default Modal;
