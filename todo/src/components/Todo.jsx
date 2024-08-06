import React, { useEffect, useState } from 'react';
import data from './data.json';
import './Todo.css';

export default function Todo({ setType, setId }) {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');
  const [completed, setCompleted] = useState([])

  useEffect(() => {
    const storedTodos = Object.keys(localStorage).map((key) => JSON.parse(localStorage.getItem(key)));
    setTodos(storedTodos);
    console.log(completed)
  }, [completed]);

  const handleSelect = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, selected: !todo.selected } : todo
      )
    );
  };

  const handleEdit = (id) => {
    setId(id);
    setType('add');
  };

  const handleDelete = (id) => {
    localStorage.removeItem(id);
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleDone = (id) => {
    setCompleted([...completed, id]);
    console.log('handleDone')
  };

  const handleUndo=(id)=>{
    setCompleted(completed.filter(t => t !== id));
    console.log('handleUndo')
  }

  const handleClear = () => {
    localStorage.clear();
    setTodos([]);
  };

  const handleAdd = () => {
    setId('');
    setType('add');
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const timeDate = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div className='body'>
      <div className='container'>
        <div className='heading'>
          <input type='text' width={'400px'} placeholder='Search' value={search} className='search' onChange={handleSearch} />
          <button onClick={handleClear}>Clear</button>
        </div>
        <div>
          {todos
            .filter((task) =>
              task.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((task) => (
              <div className='desc' key={task.id}>
                <div className='list'>
                  <div className="title" onClick={() => handleSelect(task.id)}>
                    {task.title}
                  </div>
                  <div className="actions">
                    {
                      (completed.includes(task.id)?
                      <img  src='/icons/done.svg' alt='Done' onClick={() => handleUndo(task.id)} />:
                      <img src='/icons/Done-icon.svg' alt='Undo' onClick={() => handleDone(task.id)} />
                    )
                    }
                    <img src='/icons/Edit-icon.svg' alt='Edit' onClick={() => handleEdit(task.id)} />
                    <img src='/icons/Delete-icon.svg' alt='Delete' onClick={() => handleDelete(task.id)} />
                  </div>
                </div>
                <div>
                  {task.selected ? <div>{timeDate(task.timestamp)} <br /> {task.description}</div> : null}
                </div>
              </div>
            ))}
        </div>
        <div className='add' >
          <img src='/icons/plus.svg' alt='Add' onClick={handleAdd} />
        </div>
      </div>
    </div>
  );
}
