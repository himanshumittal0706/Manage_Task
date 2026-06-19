import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/task/taskSlice";

export const store = configureStore({
    reducer: {
        todo: todoReducer,
    },
});



