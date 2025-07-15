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

const allOrdersSlice = createSlice({
	name: 'allOrders',
	initialState,
	selectors: {
		getAllOrders: (state) => state.orders,
		getAllOrdersTotal: (state) => state.total,
		getAllOrdersTotalToday: (state) => state.totalToday,
		getAllOrdersStatus: (state) => state.status,
		getAllOrdersError: (state) => state.error,
	},
	reducers: {
		allOrdersConnect: (_, action: PayloadAction<string>) => {
			console.log('url', action.payload);
		},
		allOrdersDisconnect: (state) => {
			state.status = WebsocketStatus.OFFLINE;
			state.orders = null;
			state.total = 0;
			state.totalToday = 0;
		},
		allOrdersConnecting: (state) => {
			state.status = WebsocketStatus.CONNECTING;
		},
		allOrdersOpen: (state) => {
			state.status = WebsocketStatus.ONLINE;
			state.error = null;
		},
		allOrdersClose: (state) => {
			state.status = WebsocketStatus.OFFLINE;
			state.orders = null;
			state.total = 0;
			state.totalToday = 0;
		},
		allOrdersError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
		allOrdersMessage: (state, action: PayloadAction<TOrdersResponse>) => {
			state.orders = action.payload.orders;
			state.total = action.payload.total || 0;
			state.totalToday = action.payload.totalToday || 0;
		},
	},
});

export const {
	allOrdersConnecting,
	allOrdersOpen,
	allOrdersClose,
	allOrdersError,
	allOrdersMessage,
	allOrdersDisconnect,
	allOrdersConnect,
} = allOrdersSlice.actions;

export const {
	getAllOrders,
	getAllOrdersTotal,
	getAllOrdersTotalToday,
	getAllOrdersError,
	getAllOrdersStatus,
} = allOrdersSlice.selectors;

export default allOrdersSlice.reducer;
