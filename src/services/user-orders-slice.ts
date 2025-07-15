import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	TOrdersResponse,
	TOrdersSliceState,
	WebsocketStatus,
} from '@utils/types';

const initialState: TOrdersSliceState = {
	status: WebsocketStatus.OFFLINE,
	error: null,
	orders: null,
	total: 0,
	totalToday: 0,
};

const userOrdersSlice = createSlice({
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
		userOrdersDisconnect: (state) => {
			state.status = WebsocketStatus.OFFLINE;
			state.orders = null;
			state.total = 0;
			state.totalToday = 0;
		},
		userOrdersConnecting: (state) => {
			state.status = WebsocketStatus.CONNECTING;
		},
		userOrdersOpen: (state) => {
			state.status = WebsocketStatus.ONLINE;
			state.error = null;
		},
		userOrdersClose: (state) => {
			state.status = WebsocketStatus.OFFLINE;
			state.orders = null;
			state.total = 0;
			state.totalToday = 0;
		},
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
