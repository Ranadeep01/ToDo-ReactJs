import React, { useState } from 'react'
import './TodoAdd.css'

export default function TodoAdd() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [data, setData] = useState({
        "id": 0,
        "title": "",
        "description": "",
        "timestamp": ""
    })

    const handleChange=(e)=>{
        const { name, value } = e.target
        if(name===title){
            setTitle(value)
        }
        else{
            setDescription(description)
        }
        console.log(name, value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTodo = { ...data, 
            id: localStorage.length+1, 
            title: title,
            description: description,
            timestamp: new Date().toISOString() };
        localStorage.setItem(newTodo.id, JSON.stringify(newTodo));
        setData({
            id: 0,
            title: '',
            description: '',
            timestamp: '',
        });
        setTitle('')
        setDescription('')
      };
      
  return (
    <div className='main'>
      <input type='text' placeholder='Title' name='title' onChange={handleChange}  />
      <input type='text' placeholder='Description' name='description' onChange={handleChange} />
      <div className='btn'>
        <button type='submit' onClick={handleSubmit} >Add</button>
    </div>
    </div>
  )
}
