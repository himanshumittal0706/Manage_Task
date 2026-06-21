import React from 'react'
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotFound } from './Pages/notFound';
import { TaskPage } from './Pages/TaskPage';
import { TodoApp } from './Pages/TodoPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskPage />} />
        <Route path="/todo-app" element={<TodoApp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;







