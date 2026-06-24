import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_RECEIPE_URL = "https://dummyjson.com/recipes";

export const fetchRecipe = createAsyncThunk("recipe/fetchAllRecipe", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(BASE_RECEIPE_URL);
        return response.data.recipes;
    } catch (error) {
        return rejectWithValue(
            error.response?.data?.message || error.message
        )
    }
})

export const addRecipe = createAsyncThunk("recipe/addRecipe", async (recipeData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${BASE_RECEIPE_URL}/add`,
            recipeData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        return response.data;
    } catch (error) {
        return rejectWithValue(
            error.response?.data?.message || error.message
        );
    }
})

export const recipeSearch = createAsyncThunk("recipe/searchRecipe", async (searchTerm, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_RECEIPE_URL}/search?q=${searchTerm}`);
        return response.data.recipes;
    } catch (error) {
        return rejectWithValue(
            error.response?.data?.message || error.message
        )
    }
})

const recipeSlice = createSlice({
    name: "recipeAPI",
    initialState: {
        loading: false,
        error: null,
        success: null,
        recipes: []
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipe.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecipe.fulfilled, (state, action) => {
                state.loading = false;
                state.recipes = action.payload;
            })
            .addCase(fetchRecipe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(addRecipe.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addRecipe.fulfilled, (state, action) => {
                state.loading = false;
                state.success = "Recipe added Successfully"
                state.recipes.unshift(action.payload);
            })
            .addCase(addRecipe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(recipeSearch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(recipeSearch.fulfilled, (state, action) => {
                state.loading = false;
                state.recipes = action.payload;
            })
            .addCase(recipeSearch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default recipeSlice.reducer;







