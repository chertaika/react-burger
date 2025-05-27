import { createSlice } from '@reduxjs/toolkit';

const ingredientDetailsSlice = createSlice({
	name: 'ingredientDetails',
	initialState: {
		currentIngredient: null,
	},
	selectors: {
		getIngredientDetails: (state) => state.currentIngredient,
	},
	reducers: {
		setCurrentIngredient(state, action) {
			state.currentIngredient = action.payload;
		},
		clearCurrentIngredient(state) {
			state.currentIngredient = null;
		},
	},
});

export const { setCurrentIngredient, clearCurrentIngredient } =
	ingredientDetailsSlice.actions;
export const { getIngredientDetails } = ingredientDetailsSlice.selectors;
export default ingredientDetailsSlice.reducer;
