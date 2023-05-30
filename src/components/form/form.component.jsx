import React, { useState } from 'react'
import { useEffect } from 'react'

import './form.styles.css'

const Form = () => {
  const [taskDate, setTaskDate] = useState('')
  const [taskDesc, setTaskDesc] = useState('')
  const [newTask, setNewTask] = useState('')
  const [allTasks, setAllTasks] = useState([])

  useEffect(() => {
    const initialTasks = [
      {
        id: 0,
        date: '2023-05-24',
        desc: 'task2',
        completed: false,
      },
      {
        id: 1,
        date: '2023-06-24',
        desc: 'task1',
        completed: true
      }
    ]
    setAllTasks(initialTasks)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newTask = {
      id: Date.now(),
      date: taskDate,
      desc: taskDesc,
      completed: false,
    }
    setNewTask(newTask)
    setAllTasks([newTask, ...allTasks])
    setTaskDate('')
    setTaskDesc('')
  }

  const removeTask = (id) => {
    const newArray = allTasks.filter((task) => task.id !== id)
    setAllTasks(newArray)
  }

  const updateComplete = (id) => {
    console.log(allTasks)
    const matchingTask = allTasks.find(task => task.id === id)
    const position = allTasks.indexOf(matchingTask)
    const changeStatus = {
      id: matchingTask.id,
      date: matchingTask.date,
      desc: matchingTask.desc,
      completed: !matchingTask.completed
    }
    const replacement = allTasks.splice(position, 1, changeStatus)
    console.log(replacement)
    if (replacement) {
      setAllTasks(replacement)
    }
    setAllTasks(allTasks)
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
        {allTasks?.map((task) => {
          return (
            <li key={task.id}>
              <label>
                {' '}
                Completed:
                <input
                  type='checkbox'
                  defaultChecked={task.completed}
                  onClick={() => updateComplete(task.id)}
                />
              </label>
              <h3>{task.date}</h3>
              <p>{task.desc}</p>
              <button onClick={() => removeTask(task.id)}>X</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Form
