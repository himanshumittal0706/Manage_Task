import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: [],
};

const taskSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: {
            reducer: (state, action) => {
                state.todos.push(action.payload);
            },
            prepare: (text) => ({
                payload: {
                    id: Date.now(), text, done: false,
                },
            }),
        },

        removeTodo: (state, action) => {
            state.todos = state.todos.filter(
                (todo) => todo.id !== action.payload
            );
        },

        toggleTodo: (state, action) => {
            const todo = state.todos.find(
                (todo) => todo.id === action.payload
            );

            if (todo) {
                todo.done = !todo.done;
            }
        },

        editTodo: (state, action) => {
            const { id, text } = action.payload;
            const todo = state.todos.find((todo) => todo.id === id);

            if (todo) {
                todo.text = text;
            }
        }
    },
});

export const { addTodo, removeTodo, toggleTodo, editTodo } = taskSlice.actions;

export default taskSlice.reducer;


