import React, { useState } from 'react'
import Todo from './components/Todo'
import TodoAdd from './components/TodoAdd'

export default function App() {

  const [type, setType] = useState('')


  return (
    <div>
      <Todo    />
      <TodoAdd  />
    </div>
  )
}
