import { addTodo } from "../features/task/taskSlice";
import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo, toggleTodo, editTodo } from "../features/task/taskSlice";
import { Delete, CheckCircleOutlined, CheckCircle, Edit, Check, Close } from "@mui/icons-material";


export const AddTodo = () => {
    return (
        <div className="app-container">
            <div className="app-wrapper">
                <div className="app-header">
                    <h2 className="app-title">Manage Tasks</h2>
                    <p className="app-subtitle">Stay organized and productive</p>
                </div>
                <AddTodos />
                <Todos />
            </div>
        </div>
    );
}

export const AddTodos = () => {

    const [input, setInput] = useState("");

    const dispatch = useDispatch();

    const addTodoHandler = (e) => {
        e.preventDefault();

        if (!input.trim()) return;

        dispatch(addTodo(input));

        setInput("");
    };

    return (
        <section className="add-todo-section">
            <div className="add-todo-card">
                <h2 className="add-todo-title">Add New Todo</h2>

                <form onSubmit={addTodoHandler} className="add-todo-form">
                    <input type="text" value={input} placeholder="What needs to be done?" onChange={(e) => setInput(e.target.value)} className="add-todo-input" />

                    <button type="submit" className="add-todo-button">
                        Add
                    </button>
                </form>
            </div>
        </section>
    );
}

export const Todos = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todo?.todos || []);

    const [filter, setFilter] = useState("all");

    // editingId  → which todo is currently being edited
    // editText   → the live value in the inline input
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    const filteredTodos = useMemo(() => {
        switch (filter) {
            case "active": return todos.filter((t) => !t.done);
            case "done": return todos.filter((t) => t.done);
            default: return todos;
        }
    }, [todos, filter]);

    const doneCount = useMemo(() => todos.filter((t) => t.done).length, [todos]);
    const activeCount = todos.length - doneCount;

    const filters = [
        { key: "all", label: "All", count: todos.length },
        { key: "active", label: "Active", count: activeCount },
        { key: "done", label: "Done", count: doneCount },
    ];

    const startEdit = (todo) => {
        setEditingId(todo.id);
        setEditText(todo.text);
    };

    const confirmEdit = (id) => {
        const trimmed = editText.trim();
        if (trimmed) dispatch(editTodo({ id, text: trimmed }));
        cancelEdit();
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditText("");
    };

    const handleEditKeyDown = (e, id) => {
        if (e.key === "Enter") confirmEdit(id);
        if (e.key === "Escape") cancelEdit();
    };

    return (
        <section className="todos-section">

            <div className="stats-grid">
                {filters.map(({ key, label, count }) => (
                    <div key={key} className="stat-card">
                        <p className="stat-count">{count}</p>
                        <p className="stat-label">{label}</p>
                    </div>
                ))}
            </div>

            {/* Filter tabs */}
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

            {/* List */}
            <div className="todos-list-container">
                {filteredTodos.length === 0 ? (
                    <div className="todos-empty">
                        <p className="todos-empty-icon">{filter === "done" ? "🎯" : "🚀"}</p>
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
                        {filteredTodos.map((todo) => {
                            const isEditing = editingId === todo.id;

                            return (
                                <li key={todo.id} className={`todo-item ${isEditing ? "editing" : ""}`}>

                                    {/* Check / toggle — hidden while editing */}
                                    {!isEditing && (
                                        <button
                                            type="button"
                                            aria-pressed={todo.done}
                                            aria-label={todo.done ? "Mark as active" : "Mark as completed"}
                                            title={todo.done ? "Mark as active" : "Mark as completed"}
                                            onClick={() => dispatch(toggleTodo(todo.id))}
                                            className={`todo-checkbox-btn ${todo.done ? "done" : ""}`}
                                        >
                                            {todo.done
                                                ? <CheckCircle fontSize="small" />
                                                : <CheckCircleOutlined fontSize="small" />}
                                        </button>
                                    )}

                                    {/* Inline edit input OR plain text */}
                                    {isEditing ? (
                                        <input
                                            autoFocus
                                            type="text"
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            onKeyDown={(e) => handleEditKeyDown(e, todo.id)}
                                            className="todo-edit-input"
                                            aria-label="Edit todo text"
                                        />
                                    ) : (
                                        <span
                                            className={`todo-text ${todo.done ? "done" : ""}`}
                                            onDoubleClick={() => !todo.done && startEdit(todo)}
                                        >
                                            {todo.text ?? "Unnamed Todo"}
                                        </span>
                                    )}

                                    {/* Action buttons swap based on edit mode */}
                                    {isEditing ? (
                                        <>
                                            <button
                                                type="button"
                                                aria-label="Confirm edit"
                                                title="Confirm (Enter)"
                                                onClick={() => confirmEdit(todo.id)}
                                                className="todo-confirm-btn"
                                            >
                                                <Check fontSize="small" />
                                            </button>

                                            <button
                                                type="button"
                                                aria-label="Cancel edit"
                                                title="Cancel (Esc)"
                                                onClick={cancelEdit}
                                                className="todo-cancel-btn"
                                            >
                                                <Close fontSize="small" />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button type="button" aria-label="Edit todo" title={todo.done ? "Cannot edit a completed todo" : "Edit todo"} onClick={() => startEdit(todo)} disabled={todo.done} className="todo-edit-btn">
                                                <Edit fontSize="small" />
                                            </button>

                                            <button type="button" aria-label="Delete todo" title="Delete todo" onClick={() => dispatch(removeTodo(todo.id))} className="todo-delete-btn">
                                                <Delete fontSize="small" />
                                            </button>
                                        </>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </section>
    );
}



