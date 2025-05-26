import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients-slice';
import ingredientDetailsReducer from './ingredient-details-slice';
import burgerConstructorReducer from './burger-constructor-slice';

export const store = configureStore({
	reducer: {
		ingredients: ingredientsReducer,
		ingredientDetails: ingredientDetailsReducer,
		burgerConstructor: burgerConstructorReducer,
	},
	devTools: import.meta.env.DEV,
});
