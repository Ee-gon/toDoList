import React from "react";
import ss from "./FillOut.module.css";


export default function FillOut({title, description, handleCreate}) {

    function handleSubmit(params) {
        const title = params.get("title");
        const description = params.get("description");

        handleCreate({title: title, description: description, is_completed: false});
    }

    return (
        <div className = {ss.fillOutWrap}>
          <form action = {handleSubmit} className = {ss.fillOutForm}>
            <input type = "text" placeholder="Title" name = "title" value = {title} className = {ss.titleBox} />
            <input type = "text" placeholder="DESCRIPTION" name = "description" value = {description}  className = {ss.descriptionBox} />
            <input type = "submit" value = "Add Task" className = {ss.addTaskBox} />
          </form> 
        </div>
    );
}