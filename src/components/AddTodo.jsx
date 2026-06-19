import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/task/taskSlice";

function AddTodo() {
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
                <h2 className="add-todo-title">
                    Add New Todo
                </h2>

                <form
                    onSubmit={addTodoHandler}
                    className="add-todo-form"
                >
                    <input type="text" value={input} placeholder="What needs to be done?" onChange={(e) => setInput(e.target.value)}
                        className="add-todo-input"
                    />

                    <button
                        type="submit"
                        className="add-todo-button"
                    >
                        Add
                    </button>
                </form>
            </div>
        </section>
    );
}

export default AddTodo;


