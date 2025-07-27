import {
	allOrdersClose,
	allOrdersConnect,
	allOrdersConnecting,
	allOrdersDisconnect,
	allOrdersError,
	allOrdersMessage,
	allOrdersOpen,
	allOrdersSlice,
	initialState,
} from '../all-orders-slice';
import {
	TOrdersResponse,
	TOrdersSliceState,
	WebsocketStatus,
} from '@utils/types';
import { testOrder } from '@utils/test-constants';

describe('allOrdersSlice reducers', () => {
	it('should log URL and not modify state', () => {
		const consoleSpy = jest.spyOn(console, 'log');
		const wssUrl = 'wss://all-orders-url';
		const action = allOrdersConnect(wssUrl);
		const state = allOrdersSlice.reducer(initialState, action);

		expect(consoleSpy).toHaveBeenCalledWith('url', wssUrl);
		expect(state).toEqual(initialState);
	});

	it('should reset state to offline when connection disconnect', () => {
		const modifiedState = {
			...initialState,
			status: WebsocketStatus.ONLINE,
			orders: [testOrder],
			total: 10,
			totalToday: 5,
		};

		const expectedState = {
			...initialState,
			status: WebsocketStatus.OFFLINE,
		};

		const state = allOrdersSlice.reducer(modifiedState, allOrdersDisconnect());

		expect(state).toEqual(expectedState);
	});

	it('should set status to CONNECTING', () => {
		const state = allOrdersSlice.reducer(initialState, allOrdersConnecting());

		const expectedState = {
			...initialState,
			status: WebsocketStatus.CONNECTING,
		};

		expect(state).toEqual(expectedState);
	});

	it('should set status to ONLINE and clear error when connection is open', () => {
		const modifiedState = {
			...initialState,
			status: WebsocketStatus.CONNECTING,
			error: 'some error',
		};

		const expectedState = {
			...initialState,
			status: WebsocketStatus.ONLINE,
			error: null,
		};

		const state = allOrdersSlice.reducer(modifiedState, allOrdersOpen());

		expect(state).toEqual(expectedState);
	});

	it('should reset state to offline when connection close', () => {
		const modifiedState: TOrdersSliceState = {
			...initialState,
			status: WebsocketStatus.ONLINE,
			orders: [testOrder],
			error: 'some error',
		};

		const expectedState = {
			...initialState,
			status: WebsocketStatus.OFFLINE,
			error: modifiedState.error,
		};

		const state = allOrdersSlice.reducer(modifiedState, allOrdersClose());

		expect(state).toEqual(expectedState);
	});

	it('should set error message', () => {
		const errorMessage = 'Connection failed';
		const state = allOrdersSlice.reducer(
			initialState,
			allOrdersError(errorMessage)
		);

		const expectedState = {
			...initialState,
			error: errorMessage,
		};

		expect(state).toEqual(expectedState);
	});

	it('should update orders, total, and totalToday', () => {
		const payload: TOrdersResponse = {
			success: true,
			orders: [testOrder],
			total: 100,
			totalToday: 10,
		};

		const expectedState = {
			...initialState,
			orders: payload.orders,
			total: payload.total,
			totalToday: payload.totalToday,
		};

		const state = allOrdersSlice.reducer(
			initialState,
			allOrdersMessage(payload)
		);

		expect(state).toEqual(expectedState);
	});
});
