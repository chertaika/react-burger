import {
	userOrdersSlice,
	userOrdersConnect,
	userOrdersDisconnect,
	userOrdersConnecting,
	userOrdersOpen,
	userOrdersClose,
	userOrdersError,
	userOrdersMessage,
	initialState,
} from '../user-orders-slice';
import {
	TOrdersResponse,
	TOrdersSliceState,
	WebsocketStatus,
} from '@utils/types';
import { testOrder } from '@utils/test-constants';

describe('userOrdersSlice reducers', () => {
	it('should log URL and not modify state', () => {
		const consoleSpy = jest.spyOn(console, 'log');
		const wssUrl = 'wss://user-orders-url';
		const action = userOrdersConnect(wssUrl);
		const state = userOrdersSlice.reducer(initialState, action);

		expect(consoleSpy).toHaveBeenCalledWith('url', wssUrl);
		expect(state).toEqual(initialState);
	});

	it('should reset state to offline when connection disconnect', () => {
		const modifiedState: TOrdersSliceState = {
			...initialState,
			status: WebsocketStatus.ONLINE,
			orders: [testOrder],
		};

		const expectedState = {
			...initialState,
			status: WebsocketStatus.OFFLINE,
		};

		const state = userOrdersSlice.reducer(
			modifiedState,
			userOrdersDisconnect()
		);

		expect(state).toEqual(expectedState);
	});

	it('should set status to CONNECTING', () => {
		const state = userOrdersSlice.reducer(initialState, userOrdersConnecting());

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

		const state = userOrdersSlice.reducer(modifiedState, userOrdersOpen());

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

		const state = userOrdersSlice.reducer(modifiedState, userOrdersClose());

		expect(state).toEqual(expectedState);
	});

	it('should set error message', () => {
		const errorMessage = 'Connection failed';
		const state = userOrdersSlice.reducer(
			initialState,
			userOrdersError(errorMessage)
		);

		const expectedState = {
			...initialState,
			error: errorMessage,
		};

		expect(state).toEqual(expectedState);
	});

	it('should update orders', () => {
		const payload: TOrdersResponse = {
			orders: [testOrder],
			success: true,
		};

		const expectedState = {
			...initialState,
			orders: payload.orders,
		};
		const state = userOrdersSlice.reducer(
			initialState,
			userOrdersMessage(payload)
		);

		expect(state).toEqual(expectedState);
	});
});
