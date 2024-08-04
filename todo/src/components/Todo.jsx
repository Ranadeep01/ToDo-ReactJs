import React from 'react'
import data from './data.json'
import './Todo.css'

export default function Todo() {
  return (
    <div className='container'>
      <h1>TODO App</h1>
      <div className='list'>

            {
                data.map((d)=>{
                    return(
                        <div className="title">
                            {d.task}
                        </div>
                    )
                })
            }
        </div>
        <div className="actions">
            
        </div>
    </div>
  )
}
