import React, { useState } from 'react'
import './form.styles.css'

const Form = () => {
  const [taskDate, setTaskDate] = useState('')
  const [taskDesc, setTaskDesc] = useState('')
  const [newTask, setNewTask] = useState("")
  const [allTasks, setAllTasks] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newTask = {
      id: Date.now(),
      date: taskDate,
      desc: taskDesc,
    }
    setNewTask(newTask)
    setAllTasks([newTask, ...allTasks])
    setTaskDate('')
    setTaskDesc('')
  }

const removeTask = (id) => {
    const newArray = allTasks.filter(task => task.id !== id)
    setAllTasks(newArray)
}

  return (
    <div className='form-container'>
      <label>
        {' '}
        Date:
        <input
          type='date'
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
          required
        />
      </label>
      <label>
        {' '}
        Task description:
        <input
          type='text'
          value={taskDesc}
          placeholder='Add task'
          onChange={(e) => setTaskDesc(e.target.value)}
          required
        />
      </label>
      <button onClick={handleSubmit}> add to list</button>
      <ul className='list-container'>
        { allTasks.map((task) => {
            return (
                <li key={task.id}>
                <h3>{task.date}</h3>
                <p>{task.desc}</p>
                <button onClick={() => removeTask(task.id)}>X</button>
              </li>
            )
        }
        )
    }
    </ul>
        
    </div>
  )
}

export default Form
