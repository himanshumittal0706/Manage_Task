import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_RECEIPE_URL = "https://dummyjson.com/recipes";

export const fetchReceipe = createAsyncThunk("recipe/fetchAllRecipe", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(BASE_RECEIPE_URL);
        return response.data.recipes;
    } catch (error) {
        return rejectWithValue(
            error.response?.data?.message || error.message
        )
    }
})

export const addReceipe = createAsyncThunk("recipe/addReceipe", async (recipeData, { rejectWithValue }) => {
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

const recipeSlice = createSlice({
    name: "receipeAPI",
    initialState: {
        loading: false,
        error: null,
        success: null,
        recipes: []
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchReceipe.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReceipe.fulfilled, (state, action) => {
                state.loading = false;
                state.recipes = action.payload;
            })
            .addCase(fetchReceipe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(addReceipe.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addReceipe.fulfilled, (state, action) => {
                state.loading = false;
                state.success = "Recipe added Successfully"
                state.recipes.unshift(action.payload);
            })
            .addCase(addReceipe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default recipeSlice.reducer;






