import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../store/slices/taskSlice";
import todoReducer from "../store/slices/todoSlice"
import receipeReducer from "../store/slices/recipeSlice"

export const store = configureStore({
    reducer: {
        taskAPI: taskReducer,
        todoAPI: todoReducer,
        receipeAPI: receipeReducer,
    },
});



