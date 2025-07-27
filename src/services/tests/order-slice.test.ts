import {
	orderSlice,
	resetOrder,
	clearError,
	createOrder,
	getOrderByNumber,
	initialState,
} from '../order-slice';
import {
	TOrder,
	TOrderResponse,
	TOrderSliceState,
	TOrdersResponse,
} from '@utils/types';
import { testOrder } from '@utils/test-constants';

jest.mock('@utils/api', () => ({
	createOrderRequest: jest.fn(),
	getOrderByNumberRequest: jest.fn(),
}));

describe('orderSlice reducers', () => {
	it('should clear order', () => {
		const modifiedState: TOrderSliceState = {
			...initialState,
			order: testOrder,
			isLoading: true,
			errorMessage: 'error',
		};
		const state = orderSlice.reducer(modifiedState, resetOrder());

		expect(state.order).toBeNull();
		expect(state.isLoading).toBe(modifiedState.isLoading);
		expect(state.errorMessage).toBe(modifiedState.errorMessage);
	});

	it('should clear errorMessage', () => {
		const modifiedState: TOrderSliceState = {
			...initialState,
			errorMessage: 'error',
			isLoading: true,
		};
		const state = orderSlice.reducer(modifiedState, clearError());

		expect(state.errorMessage).toBeNull();
		expect(state.isLoading).toBe(modifiedState.isLoading);
		expect(state.order).toBe(initialState.order);
	});

	describe('createOrder', () => {
		it('pending should set isLoading to true and clear error', () => {
			const modifiedState: TOrderSliceState = {
				...initialState,
				errorMessage: 'previous error',
				order: testOrder,
			};
			const state = orderSlice.reducer(modifiedState, createOrder.pending(''));

			expect(state.isLoading).toBe(true);
			expect(state.errorMessage).toBeNull();
			expect(state.order).toEqual(modifiedState.order);
		});

		it('fulfilled should set order and clear loading', () => {
			const payload: TOrderResponse = {
				name: 'Test Order',
				order: testOrder,
				success: true,
			};
			const state = orderSlice.reducer(
				initialState,
				createOrder.fulfilled(payload, '')
			);

			expect(state.isLoading).toBe(false);
			expect(state.order).toEqual(payload.order);
			expect(state.errorMessage).toBeNull();
		});

		it('rejected should set error and clear loading', () => {
			const errorMessage = 'Failed to create order';
			const state = orderSlice.reducer(
				initialState,
				createOrder.rejected(new Error(), '', undefined, errorMessage)
			);

			expect(state.isLoading).toBe(false);
			expect(state.errorMessage).toBe(errorMessage);
			expect(state.order).toBe(initialState.order);
		});
	});

	describe('getOrderByNumber', () => {
		it('pending should set isLoading to true and clear error', () => {
			const modifiedState: TOrderSliceState = {
				...initialState,
				errorMessage: 'previous error',
				order: testOrder,
			};
			const state = orderSlice.reducer(
				modifiedState,
				getOrderByNumber.pending('', '123')
			);

			expect(state.isLoading).toBe(true);
			expect(state.errorMessage).toBeNull();
			expect(state.order).toEqual(modifiedState.order);
		});

		it('fulfilled should set order and clear loading', () => {
			const payload: TOrdersResponse = {
				orders: [testOrder] as Array<TOrder>,
				success: true,
			};
			const state = orderSlice.reducer(
				initialState,
				getOrderByNumber.fulfilled(payload, '', '123')
			);

			expect(state.isLoading).toBe(false);
			expect(state.order).toEqual(payload.orders[0]);
			expect(state.errorMessage).toBeNull();
		});

		it('rejected should set error and clear loading', () => {
			const errorMessage = 'Failed to fetch order';
			const state = orderSlice.reducer(
				initialState,
				getOrderByNumber.rejected(new Error(), '', '123', errorMessage)
			);

			expect(state.isLoading).toBe(false);
			expect(state.errorMessage).toBe(errorMessage);
			expect(state.order).toBe(initialState.order);
		});
	});
});
