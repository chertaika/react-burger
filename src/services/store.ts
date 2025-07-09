import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from 'src/services/ingredients-slice';
// @ts-expect-error: TS7016: Could not find a declaration file for module ./burger-constructor-slice.
import burgerConstructorReducer from './burger-constructor-slice';
// @ts-expect-error: TS7016: Could not find a declaration file for module ./order-slice.
import orderReducer from './order-slice';
// @ts-expect-error: TS7016: Could not find a declaration file for module ./user-slice.
import userReducer from './user-slice';
import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
	reducer: {
		ingredients: ingredientsReducer,
		burgerConstructor: burgerConstructorReducer,
		order: orderReducer,
		user: userReducer,
	},
	devTools: import.meta.env.DEV,
});

type AppStore = typeof store;
type RootState = ReturnType<AppStore['getState']>;
type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
