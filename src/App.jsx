import { useEffect, useState } from 'react'
import './App.css'
import Card from './Card/Card'
import FillOut from './FillOut/FillOut' 

function App() {
  const [tasks, setTasks] = useState([]);

  async function getTasks() {
    try{
      const response = await fetch("http://localhost:4000/tasks");
      const tasksData = await response.json();
      setTasks(tasksData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  async function deleteTask(id) {
    try {
      const response = await fetch(`http://localhost:4000/tasks/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      getTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  async function updateTask(taskId, updatedData) {
    try {
      const response = await fetch(`http://localhost:4000/tasks/fullUpdate/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (!response.ok) {
      throw new Error("Error updating task.");
    }

    const result = await response.json();
    console.log("Updated task successfully:", result);
  } catch (error) {
    console.error("Error updating task:", error);}
  }

async function createTask(data) {
  console.log("Creating task with data:", data);
  console.log(JSON.stringify(data));

  try {
    const response = await fetch("http://localhost:4000/tasks/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error creating task.");
    }

    const result = await response.json();
    console.log("Created task successfully:", result);
    getTasks();
  } catch (error) {
    console.error("Error creating task:", error);
  }
}

return (
  <>
  <div className='header'>
  <h1 id = "appName">MyPlanner</h1>
  <h6 id = "authorNote">~* made by Egon *~</h6>
  <h3 id= "line"><b>_______________________________________________________________________________</b></h3>
  </div>
  <p className='addNew'>Add a new task!</p>
  <h6 className = 'addNew'>(go on, whatever you want)</h6>

  <FillOut handleCreate={createTask} />
  {tasks.length === 0 ? (
    <p className = "serverInfo">Sorry dude, the server really sucks right now</p>
  ) : (
    tasks.map((task) => (
      <Card
        key = {task.id}
        {...task}

        handleUpdate = {updateTask}
        handleDelete = {deleteTask}
        
      />     
     ))
    )} 
  </>
 );
}
export default App;
