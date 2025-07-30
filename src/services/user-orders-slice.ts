import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	TOrdersResponse,
	TOrdersSliceState,
	WebsocketStatus,
} from '@utils/types';

export const initialState: TOrdersSliceState = {
	status: WebsocketStatus.OFFLINE,
	error: null,
	orders: null,
};

export const userOrdersSlice = createSlice({
	name: 'userOrders',
	initialState,
	selectors: {
		getUserOrders: (state) => state.orders,
		getUserOrdersStatus: (state) => state.status,
		getUserOrdersError: (state) => state.error,
	},
	reducers: {
		userOrdersConnect: (_, action: PayloadAction<string>) => {
			console.log('url', action.payload);
		},
		userOrdersDisconnect: (state) => ({
			...initialState,
			status: WebsocketStatus.OFFLINE,
			error: state.error,
		}),
		userOrdersConnecting: (state) => {
			state.status = WebsocketStatus.CONNECTING;
		},
		userOrdersOpen: (state) => {
			state.status = WebsocketStatus.ONLINE;
			state.error = null;
		},
		userOrdersClose: (state) => ({
			...initialState,
			status: WebsocketStatus.OFFLINE,
			error: state.error,
		}),
		userOrdersError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
		userOrdersMessage: (state, action: PayloadAction<TOrdersResponse>) => {
			state.orders = action.payload.orders;
		},
	},
});

export const {
	userOrdersConnect,
	userOrdersDisconnect,
	userOrdersConnecting,
	userOrdersMessage,
	userOrdersError,
	userOrdersOpen,
	userOrdersClose,
} = userOrdersSlice.actions;

export const { getUserOrders, getUserOrdersStatus, getUserOrdersError } =
	userOrdersSlice.selectors;

export default userOrdersSlice.reducer;
