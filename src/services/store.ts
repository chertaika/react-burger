import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients-slice';
import burgerConstructorReducer from './burger-constructor-slice';
import orderReducer from './order-slice';
import userReducer from './user-slice';
import allOrdersReducer, {
	allOrdersClose,
	allOrdersConnect,
	allOrdersConnecting,
	allOrdersDisconnect,
	allOrdersError,
	allOrdersMessage,
	allOrdersOpen,
} from './all-orders-slice';
import userOrdersReducer, {
	userOrdersClose,
	userOrdersConnect,
	userOrdersConnecting,
	userOrdersDisconnect,
	userOrdersError,
	userOrdersMessage,
	userOrdersOpen,
} from './user-orders-slice';
import { socketMiddleware } from '@store/middleware/socket-middleware';

const allOrdersWsActions = {
	connect: allOrdersConnect,
	disconnect: allOrdersDisconnect,
	onConnecting: allOrdersConnecting,
	onOpen: allOrdersOpen,
	onClose: allOrdersClose,
	onError: allOrdersError,
	onMessage: allOrdersMessage,
};

const userOrdersWsActions = {
	connect: userOrdersConnect,
	disconnect: userOrdersDisconnect,
	onConnecting: userOrdersConnecting,
	onOpen: userOrdersOpen,
	onClose: userOrdersClose,
	onError: userOrdersError,
	onMessage: userOrdersMessage,
};

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	burgerConstructor: burgerConstructorReducer,
	order: orderReducer,
	user: userReducer,
	allOrders: allOrdersReducer,
	userOrders: userOrdersReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			socketMiddleware(allOrdersWsActions),
			socketMiddleware(userOrdersWsActions, true)
		),
	devTools: import.meta.env.DEV,
});
