import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://dummyjson.com/todos";

export const fetchAllTodos = createAsyncThunk("todo/fetchAllTodos", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data.todos;
    } catch (error) {
        return rejectWithValue(
            error.response?.data?.message || error.message
        );
    }
});

export const fetchTodoById = createAsyncThunk("todo/fetchTodoById", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(
            error.response?.data?.message || error.message
        );
    }
});

const todoAPISlice = createSlice({
    name: "todoAPI",
    initialState: {
        loading: false,
        error: null,
        todos: [],
        singleTodo: null
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload;
            })
            .addCase(fetchAllTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // --fetchTodoByID--
            .addCase(fetchTodoById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodoById.fulfilled, (state, action) => {
                state.loading = false;
                state.singleTodo = action.payload;
            })
            .addCase(fetchTodoById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default todoAPISlice.reducer;


