import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from './ingredients-slice';

const rootReducer = combineReducers({
	ingredients: ingredientsSlice,
});

export const store = configureStore({
	reducer: rootReducer,
	devTools: import.meta.env.DEV,
});
