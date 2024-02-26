import React, { useState } from "react";
import styles from "./Modal.module.css";



const Modal = ({ onClose }) => {

  const [formData, setFormData] = useState({
    title: "",
    selectedPriority: "High", // athi gote default priority selsect in modal
    dueDate: "",
    checklistItems: [{ text: "", completed: false }],
  });



  // const [selectedPriority, setSelectedPriority] = useState();
  // const [checklistItems, setChecklistItems] = useState([
  //   { text: "", completed: false }, // Initial checklist item
  // ]);


  const handleChecklistChange = (index, event) => {
    const updatedChecklist = formData.checklistItems.map((item, i) =>
      i === index ? { ...item, completed: event.target.checked } : item
      //athi checked item ta rerender jamti habani code add karichi
    );
    setFormData({ ...formData, checklistItems: updatedChecklist });
  };


  const handleAddItem = () => {
    setFormData({
      ...formData,
      checklistItems: [
        ...formData.checklistItems,
        { text: "", completed: false },
      ],
    });
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    const { title, dueDate, selectedPriority, checklistItems } = formData;
    console.log("Form Data:", formData); 
    // Check if a priority is selected
    if (!selectedPriority) {
      console.error("Please select a priority.");
      return; // Stop form submission if priority is not selected
    }
    // Create checklist array
    const checklist = checklistItems.map((item) => ({
      text: item.text,
    }));
    try {
      const response = await fetch("http://localhost:5000/api/v1/todo/new", {
        method: "POST",
        body: JSON.stringify({
          title,
          priority: selectedPriority, // athi Include selected priority
          checklist,
          dueDate,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        // Handle successful submission (e.g., close modal, display success message)
        onClose();
      } else {
        // Handle error (e.g., display error message)
        console.error("Error creating todo:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("Field Name:", name, "Value:", value); //console karichi Log field name and value
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          {/* <div className={styles.modal}>
        <div className={styles.overlay}></div>
        <div className={styles.modal_content}> */}
          <form onSubmit={handleSubmit} className={styles.modal_form}>
            <div className={styles.title_head}>
              <label className={styles.priority_text} htmlFor="">
                Title
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
              <label className={styles.priority_text}>Select Priority:</label>
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
                  {priority} Priority
                </button>
              ))}
              
            </div>

            <div className={styles.checklist}>
              <p>
                Checklist ({formData.checklistItems.length}/
                {formData.checklistItems.length})
              </p>
              {formData.checklistItems.map((item, index) => (
                <div key={index} className={styles.checklistItem}>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={(e) => handleChecklistChange(index, e)}
                    //athi checked item ta rerender na haba au form jamti defult submit na haba sethi pain logic change karichi kindly look into it
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
                    className={styles.checklistItemInput}
                  />
                </div>
              ))}
              <button onClick={handleAddItem}>
                <span>+</span> Add New
              </button>
            </div>
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
          {/* </div> */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};
export default Modal;