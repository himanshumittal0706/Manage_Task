import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../store/slices/taskSlice";
import todoReducer from "../store/slices/todoSlice"

export const store = configureStore({
    reducer: {
        taskAPI: taskReducer,
        todoAPI: todoReducer,
    },
});



