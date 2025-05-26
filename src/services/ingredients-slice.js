import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getInitialData from '@utils/api';

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

const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState: {
		ingredients: [],
		isLoading: false,
		errorMessage: null,
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
				state.isLoading = false;
				state.errorMessage = action.payload;
			});
	},
});

export default ingredientsSlice.reducer;
