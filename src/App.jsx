import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotFound } from "./Pages/NotFound";
import { TaskPage } from "./Pages/TaskPage";
import { TodoApp } from "./Pages/TodoPage";
import { RecipePage } from "./Pages/RecipePage";
import { Navbar } from "./Components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<TaskPage />} />
        <Route path="/todo-app" element={<TodoApp />} />
        <Route path="/recipe-app" element={<RecipePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;