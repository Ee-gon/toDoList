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
          <form action = {handleSubmit} className = {ss.fillOutWrap}>
            <input type = "text" placeholder="Title" name = "title" value = {title} />
            <input type = "text" placeholder="Description" name = "description" value = {description} />
            <input type = "submit" value = "Add Task" className = {ss.submitButton} />
          </form> 
        </div>
    );
}