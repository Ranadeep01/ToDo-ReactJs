import React, { useState } from 'react';
import Todo from './components/Todo';
import TodoAdd from './components/TodoAdd';

export default function App() {
  
  const [type, setType] = useState('show');
  const [id, setId] = useState('');

  return (
    <div>
      {type === 'show' ? (
        <Todo setType={setType} setId={setId} />
      ) : (
        <TodoAdd setType={setType} Id={id} />
      )}
    </div>
  );
}
