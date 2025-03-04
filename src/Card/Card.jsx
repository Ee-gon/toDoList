import React, { useState } from "react";
import ss from "./Card.module.css";

export default function Card({
    id,
    title,
    description,
    is_completed,
    handleDelete,
    handleUpdate,
  }) {
    const [titleText, setTitleText] = useState(title);
    const [desc, setDesc] = useState(description);
    const [isCompleted, setIsCompleted] = useState(
      is_completed === 0 ? false : true
    );
    
  
    const [editClicked, setEditClicked] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
  
    function handleChange() {
      setIsDisabled(false);
      setEditClicked(true);
      if (editClicked) {
        handleUpdate(id, {
          title: titleText,
          description: desc,
          is_completed: isCompleted,
        });
        console.log(titleText, desc, isCompleted);
        setEditClicked(false);
        setIsDisabled(true);
      }
    }
  
    function onCheckClick() {
      handleUpdate(id, {
        title: titleText,
        description: desc,
        is_completed: isCompleted,
      });
      setIsCompleted(!isCompleted);
    }
  
    return (
      <div className={ss.cardBox}>
        <div className={ss.controlBtns}>
          <button onClick={() => handleDelete(id)}>
            <i className="material-symbols-outlined">delete</i>
          </button>
          <button onClick={handleChange}>
            {editClicked ? (
              <i className="material-symbols-outlined">done</i>
            ) : (
              <i className="material-symbols-outlined">edit</i>
            )}
          </button>
        </div>
  
        <div className={isCompleted ? ss.completed : ss.contentWrapper}>
          <div className={ss.listWrapper}>
            <input
              className = {ss.listTitle}
              type="text"
              name="title"
              value={titleText}
              onChange={(e) => setTitleText(e.target.value)}
              disabled={isDisabled}
            />
            <textarea
              className = {ss.listDescription}
              type="text"
              name="desc"
              value={desc}
              maxLength={150}
              onChange={(e) => setDesc(e.target.value)}
              disabled={isDisabled}
            />
          </div>
          <div className={ss.checkBox}>
            <input
              type="checkbox"
              name="check"
              checked={isCompleted}
              value={isCompleted}
              onChange={onCheckClick}
            />
          </div>
        </div>
      </div>
    );
  }