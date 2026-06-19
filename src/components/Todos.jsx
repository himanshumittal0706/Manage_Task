import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo, toggleTodo } from "../features/task/taskSlice";

import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function Todos() {
    const dispatch = useDispatch();

    const todos = useSelector((state) => state.todo?.todos || []);

    const [filter, setFilter] = useState("all");

    const filteredTodos = useMemo(() => {
        switch (filter) {
            case "active":
                return todos.filter((todo) => !todo.done);

            case "done":
                return todos.filter((todo) => todo.done);

            default:
                return todos;
        }
    }, [todos, filter]);

    const doneCount = useMemo(
        () => todos.filter((todo) => todo.done).length,
        [todos]
    );

    const activeCount = todos.length - doneCount;

    const filters = [
        {
            key: "all",
            label: "All",
            count: todos.length,
        },
        {
            key: "active",
            label: "Active",
            count: activeCount,
        },
        {
            key: "done",
            label: "Done",
            count: doneCount,
        },
    ];

    return (
        <section className="todos-section">
            {/* Stats Cards */}
            <div className="stats-grid">
                {filters.map(({ key, label, count }) => (
                    <div
                        key={key}
                        className="stat-card"
                    >
                        <p className="stat-count">
                            {count}
                        </p>
                        <p className="stat-label">
                            {label}
                        </p>
                    </div>
                ))}
            </div>

            {/* Filter Buttons */}
            <div className="filter-buttons">
                {filters.map(({ key, label }) => (
                    <button
                        key={key}
                        type="button"
                        onClick={() => setFilter(key)}
                        className={`filter-btn ${filter === key ? "active" : "inactive"}`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Todo List */}
            <div className="todos-list-container">
                {filteredTodos.length === 0 ? (
                    <div className="todos-empty">
                        <p className="todos-empty-icon">
                            {filter === "done" ? "🎯" : "🚀"}
                        </p>

                        <p className="todos-empty-message">
                            {filter === "done"
                                ? "No completed tasks yet."
                                : filter === "active"
                                ? "No active tasks — you're all caught up!"
                                : "No todos yet. Add one to get started!"}
                        </p>
                    </div>
                ) : (
                    <ul className="todos-list">
                        {filteredTodos.map((todo, index) => (
                            <li
                                key={todo.id}
                                className="todo-item"
                            >
                                {/* Toggle Todo */}
                                <button
                                    type="button"
                                    aria-pressed={todo.done}
                                    aria-label={
                                        todo.done
                                            ? "Mark as active"
                                            : "Mark as completed"
                                    }
                                    title={
                                        todo.done
                                            ? "Mark as active"
                                            : "Mark as completed"
                                    }
                                    onClick={() =>
                                        dispatch(toggleTodo(todo.id))
                                    }
                                    className={`todo-checkbox-btn ${todo.done ? "done" : ""}`}
                                >
                                    {todo.done ? (
                                        <CheckCircleIcon fontSize="small" />
                                    ) : (
                                        <CheckCircleOutlinedIcon fontSize="small" />
                                    )}
                                </button>

                                {/* Todo Text */}
                                <span
                                    className={`todo-text ${todo.done ? "done" : ""}`}
                                >
                                    {todo.text ?? "Unnamed Todo"}
                                </span>

                                {/* Delete Todo */}
                                <button
                                    type="button"
                                    aria-label="Delete todo"
                                    title="Delete todo"
                                    onClick={() =>
                                        dispatch(removeTodo(todo.id))
                                    }
                                    className="todo-delete-btn"
                                >
                                    <DeleteIcon fontSize="small" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}

export default Todos;

