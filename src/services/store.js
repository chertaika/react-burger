import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients-slice';
import ingredientDetailsReducer from './ingredient-details-slice';

export const store = configureStore({
	reducer: {
		ingredients: ingredientsReducer,
		ingredientDetails: ingredientDetailsReducer,
	},
	devTools: import.meta.env.DEV,
});
