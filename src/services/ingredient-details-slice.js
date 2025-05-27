import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentIngredient: null,
};

const ingredientDetailsSlice = createSlice({
	name: 'ingredientDetails',
	initialState: initialState,
	selectors: {
		getIngredientDetails: (state) => state.currentIngredient,
	},
	reducers: {
		setCurrentIngredient(state, action) {
			state.currentIngredient = action.payload;
		},
		clearCurrentIngredient(state) {
			state.currentIngredient = initialState.currentIngredient;
		},
	},
});

export const { setCurrentIngredient, clearCurrentIngredient } =
	ingredientDetailsSlice.actions;
export const { getIngredientDetails } = ingredientDetailsSlice.selectors;
export default ingredientDetailsSlice.reducer;
