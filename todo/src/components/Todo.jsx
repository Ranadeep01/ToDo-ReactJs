import React, { useEffect, useState } from 'react';
import data from './data.json';
import './Todo.css';

export default function Todo({ setType, setId }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = Object.keys(localStorage).map((key) => JSON.parse(localStorage.getItem(key)));
    setTodos(storedTodos);
  }, []);

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
    setTodos(todos.filter((t) => t.id !== id));
    const completedTodo = todos.find((t) => t.id === id);
    if (completedTodo) {
      localStorage.setItem(`completed-${completedTodo.id}`, JSON.stringify(completedTodo));
      localStorage.removeItem(id);
    }
  };

  const handleAdd = () => {
    setId('');
    setType('add');
  };

  return (
    <div className='container'>
      <h1>TODO App</h1>
      <div>
        {todos.map((task) => (
          <div className='desc' key={task.id}>
            <div className='list'>
              <div className="title" onClick={() => handleSelect(task.id)}>
                {task.title}
              </div>
              <div className="actions">
                <img src='/icons/Done-icon.svg' alt='Done' onClick={() => handleDone(task.id)} />
                <img src='/icons/Edit-icon.svg' alt='Edit' onClick={() => handleEdit(task.id)} />
                <img src='/icons/Delete-icon.svg' alt='Delete' onClick={() => handleDelete(task.id)} />
              </div>
            </div>
            <div>
              {task.selected ? <div>{task.description}</div> : null}
            </div>
          </div>
        ))}
      </div>
      <div className='add' onClick={handleAdd}>
        <img src='/icons/plus.svg' alt='Add' />
      </div>
    </div>
  );
}
