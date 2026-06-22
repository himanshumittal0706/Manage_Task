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

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const BASE_URL = "https://dummyjson.com/todos";

// // -- Get All Todos --
// export const fetchAllTodos = createAsyncThunk(
//     "todo/fetchAllTodos",
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await axios.get(BASE_URL);
//             return response.data.todos;
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );

// // -- Get Todo By Id --
// export const fetchTodoById = createAsyncThunk(
//     "todo/fetchTodoById",
//     async (id, { rejectWithValue }) => {
//         try {
//             const response = await axios.get(`${BASE_URL}/${id}`);
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );

// // -- Random Todo --
// export const fetchRandomTodo = createAsyncThunk(
//     "todo/fetchRandomTodo",
//     async (_, { rejectWithValue }) => {
//         try {
//             const randomId = Math.floor(Math.random() * 30) + 1;

//             const response = await axios.get(
//                 `${BASE_URL}/${randomId}`
//             );

//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );

// // -- Add Todo --
// export const fetchAddTodo = createAsyncThunk(
//     "todo/addTodo",
//     async (todoText, { rejectWithValue }) => {
//         try {
//             const response = await axios.post(
//                 `${BASE_URL}/add`,
//                 {
//                     todo: todoText,
//                     completed: false,
//                     userId: 1,
//                 }
//             );

//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );

// // Delete Todo
// export const deleteTodo = createAsyncThunk(
//     "todo/deleteTodo",
//     async (id, { rejectWithValue }) => {
//         try {
//             const response = await axios.delete(
//                 `${BASE_URL}/${id}`
//             );

//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );


// const todoSlice = createSlice({
//     name: "todo",

//     initialState: {
//         todos: [],
//         selectedTodo: null,
//         loading: false,
//         error: null,
//     },

//     reducers: {
//         clearSelectedTodo: (state) => {
//             state.selectedTodo = null;
//         },

//         clearError: (state) => {
//             state.error = null;
//         },

//         clearAllTodos: (state) => {
//             state.todos = [];
//         },

//         toggleTodoComplete: (state, action) => {
//             const todo = state.todos.find(
//                 (item) => item.id === action.payload
//             );

//             if (todo) {
//                 todo.completed = !todo.completed;
//             }

//             if (
//                 state.selectedTodo &&
//                 state.selectedTodo.id === action.payload
//             ) {
//                 state.selectedTodo.completed =
//                     !state.selectedTodo.completed;
//             }
//         },
//     },

//     extraReducers: (builder) => {
//         builder

//             // ====================
//             // Fetch All
//             // ====================

//             .addCase(fetchAllTodos.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })

//             .addCase(fetchAllTodos.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.todos = action.payload;
//             })

//             .addCase(fetchAllTodos.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error =
//                     action.payload || "Failed to fetch todos";
//             })

//             // ====================
//             // Fetch By ID
//             // ====================

//             .addCase(fetchTodoById.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })

//             .addCase(fetchTodoById.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.selectedTodo = action.payload;
//             })

//             .addCase(fetchTodoById.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error =
//                     action.payload || "Failed to fetch todo";
//             })

//             // ====================
//             // Random Todo
//             // ====================

//             .addCase(fetchRandomTodo.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })

//             .addCase(fetchRandomTodo.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.selectedTodo = action.payload;
//             })

//             .addCase(fetchRandomTodo.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error =
//                     action.payload || "Failed to fetch random todo";
//             })

//             // ====================
//             // Add Todo
//             // ====================

//             .addCase(fetchAddTodo.pending, (state) => {
//                 state.loading = true;
//             })

//             .addCase(fetchAddTodo.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.todos.unshift(action.payload);
//             })

//             .addCase(fetchAddTodo.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error =
//                     action.payload || "Failed to add todo";
//             })

//             // ====================
//             // Delete Todo
//             // ====================

//             .addCase(deleteTodo.pending, (state) => {
//                 state.loading = true;
//             })

//             .addCase(deleteTodo.fulfilled, (state, action) => {
//                 state.loading = false;

//                 state.todos = state.todos.filter(
//                     (todo) => todo.id !== action.payload.id
//                 );

//                 if (
//                     state.selectedTodo &&
//                     state.selectedTodo.id === action.payload.id
//                 ) {
//                     state.selectedTodo = null;
//                 }
//             })

//             .addCase(deleteTodo.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error =
//                     action.payload || "Failed to delete todo";
//             });
//     },
// });

// export const { clearSelectedTodo, clearError, clearAllTodos, toggleTodoComplete } = todoSlice.actions;

// export default todoSlice.reducer;



