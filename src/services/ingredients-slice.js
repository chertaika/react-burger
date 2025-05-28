import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getInitialData } from '@utils/api';

export const getIngredients = createAsyncThunk(
	'ingredients/getIngredients',
	async (_, { rejectWithValue }) => {
		try {
			const response = await getInitialData();
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

const initialState = {
	ingredients: [],
	isLoading: false,
	errorMessage: null,
};

const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState: initialState,
	selectors: {
		getAllIngredients: (state) => state.ingredients,
		getIngredientsLoading: (state) => state.loading,
		getIngredientsError: (state) => state.errorMessage,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getIngredients.pending, (state) => {
				state.isLoading = true;
				state.errorMessage = null;
			})
			.addCase(getIngredients.fulfilled, (state, action) => {
				state.isLoading = false;
				state.ingredients = action.payload;
			})
			.addCase(getIngredients.rejected, (state, action) => {
				state.ingredients = initialState.ingredients;
				state.isLoading = false;
				state.errorMessage = action.payload;
			});
	},
});

export const { getAllIngredients, getIngredientsLoading, getIngredientsError } =
	ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
