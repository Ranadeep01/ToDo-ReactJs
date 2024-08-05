import React, { useEffect, useState } from 'react';
import './TodoAdd.css';

export default function TodoAdd({ setType, Id }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (Id) {
      const todo = JSON.parse(localStorage.getItem(Id));
      if (todo) {
        setTitle(todo.title);
        setDescription(todo.description);
        setEdit(true);
      }
    }
  }, [Id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    } else {
      setDescription(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: edit ? parseInt(Id) : localStorage.length + 1,
      title,
      description,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem(newTodo.id, JSON.stringify(newTodo));

    setTitle('');
    setDescription('');
    setEdit(false);
    setType('show');
  };

  return (
    <div className='main'>
      <input type='text' placeholder='Title' name='title' value={title} onChange={handleChange} />
      <input type='text' placeholder='Description' name='description' value={description} onChange={handleChange} />
      <div className='btn'>
        <button type='submit' onClick={handleSubmit}>
          {edit ? 'Save' : 'Add'}
        </button>
      </div>
    </div>
  );
}
