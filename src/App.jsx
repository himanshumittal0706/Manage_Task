import React from 'react'
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddTodo } from './components/AddTodo';
import { NotFound } from './Pages/notFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddTodo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;





