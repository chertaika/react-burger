import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients-slice';
import burgerConstructorReducer from './burger-constructor-slice';
import orderReducer from './order-slice';
import userReducer from './user-slice';

export const store = configureStore({
	reducer: {
		ingredients: ingredientsReducer,
		burgerConstructor: burgerConstructorReducer,
		order: orderReducer,
		user: userReducer,
	},
	devTools: import.meta.env.DEV,
});
