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

const recipeSlice = createSlice({
    name: "receipeAPI",
    initialState: {
        loading: false,
        error: null,
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
    }
})

export default recipeSlice.reducer;




