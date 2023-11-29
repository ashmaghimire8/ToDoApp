import './style.css'; 
import './App.css';
import { AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { useState } from 'react';


function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("")

  const currentDate = new Date();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
  const day = currentDate.getDate().toString().padStart(2, '0');
  const year = currentDate.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;


  const handleChange = (event) => {
    setNewTask(event.target.value)
  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
    
  }

  const addTask = () => {
    const task = {
      id: todoList.length === 0 ? 1 : todoList[todoList.length -1 ].id + 1,
      taskName : newTask,
      completed : false
    }
    setTodoList([...todoList,task])
   
  }

  const deleteTask = (id) => {
    const newTodoList = todoList.filter((task) => {
      if(task.id === id){
        return false
      } else {
        return true
      }
    })
    setTodoList(newTodoList)
  }

  const completeTask = (id) => {
    setTodoList(
      todoList.map((task) => {
        if(task.id === id){
          return{...task, completed: true}
        } else{
          return task;
        }
      })
    )
  }

  
  
  return (
    <div className="App">
      
      <div className='header'>
        <h1>MY TO-DO APP</h1>
        <p>{formattedDate}</p>
      </div>

      <div className='addTask'>
        <input 
          onChange={handleChange}
          onKeyUp={handleKeyPress}
        />
        <button onClick={addTask} >Add Task</button>
      </div>
      <div className='list'>
        {todoList.map((task) =>{
          return <div style={{color:task.completed?"green":"black"}}> 
              <h1>{task.taskName}</h1>
              <button onClick={() => deleteTask(task.id)}><AiFillDelete/></button>
              <button onClick={() => completeTask(task.id)}><MdDone/></button>
            </div>
        }
        )}
      </div>
    </div>
  );
}


export default App;
 