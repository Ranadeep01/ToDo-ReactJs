import React, { useEffect, useState } from 'react'
import data from './data.json'
import './Todo.css'

export default function Todo() {
  const [todos, setTodos] = useState(data)
  const [id, setId] = useState(todos.length)
  const [selected, setSelected] = useState(new Set())
  const [completed, setCompleted] = useState([])

  useEffect(()=>{
    todos.forEach((t)=>{
      console.log(localStorage.length)
      localStorage.setItem(t.id, JSON.stringify(t))
    })

  },[todos, localStorage])



  const handleSelect = (id) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelected(newSelected);
  };

  const handleEdit=(id)=>{
    console.log('handle Edit')
    const todo = todos.filter((t)=>t.id===id) 
  }

  const handleDelete=(id)=>{
    localStorage.removeItem(id)
    setTodos(todos.filter((t)=>t.id!==id))  
  }

  const handleDone=(id)=>{
    const c = completed
    c.push(id)
    setCompleted([...c])
    setTodos(todos.filter((t)=>t.id!==id))
  }

  const handleAdd=()=>{
    console.log('handle Add')
    
  }

  return (
    <div className='container'>
      <h1>TODO App</h1>
      <div>
          {
            // todos.map((task)=>{
              Object.keys(localStorage).map((key)=>{
                const task = JSON.parse(localStorage.getItem(key))
                return(
                  <div className='desc'>
                    <div className='list'>
                      <div className="title" onClick={()=>handleSelect(task.id)}>
                          {task.title}                          
                      </div>
                      <div className="actions">
                        <img src='/icons/Done-icon.svg' alt='Done' onClick={()=>handleDone(task.id)} />
                        <img src='/icons/Edit-icon.svg' alt='Edit' onClick={()=>handleEdit(task.id)} />
                        <img src='/icons/Delete-icon.svg' alt='Delete' onClick={()=>handleDelete(task.id)} />
                    </div>
                    </div>
                    <div>
                      {
                        selected.has(task.id)?
                        <div>{task.description}</div>:null
                      }
                    </div>
                  </div>
                )
              })
            }
        </div>
        <div className='add' onClick={handleAdd}>
            <img src='/icons/plus.svg' alt='Add' />
        </div>
    </div>
  )
}
