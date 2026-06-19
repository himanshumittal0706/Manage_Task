import React from 'react'
import './App.css'
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'

function App() {
  return (
    <div className="app-container">
      <div className="app-wrapper">
        <div className="app-header">
          <h2 className="app-title">Manage Tasks</h2>
          <p className="app-subtitle">Stay organized and productive</p>
        </div>
        <AddTodo />
        <Todos />
      </div>
    </div>
  )
}

export default App



