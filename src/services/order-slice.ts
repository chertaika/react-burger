import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrderRequest, getOrderByNumberRequest } from '@utils/api';
import { getBun, getFillings } from '@store/burger-constructor-slice';
import { errorMessages } from '@utils/constants';
import {
	TErrorResponseData,
	TOrderResponse,
	TOrderSliceState,
	TOrdersResponse,
} from '@utils/types';
import { RootState } from '@store/hooks';

export const createOrder = createAsyncThunk<
	TOrderResponse,
	void,
	{
		state: RootState;
		rejectValue: string;
	}
>('order/createOrder', async (_, { getState, rejectWithValue }) => {
	try {
		const state = getState();
		const bun = getBun(state);
		const fillings = getFillings(state);

		const ingredients = [
			...(bun ? [bun._id] : []),
			...fillings.map((filling) => filling._id),
			...(bun ? [bun._id] : []),
		];

		return await createOrderRequest(ingredients);
	} catch (error) {
		console.log(error);
		return rejectWithValue(
			(error as TErrorResponseData).message || errorMessages.CREATE_ORDER
		);
	}
});

export const getOrderByNumber = createAsyncThunk<
	TOrdersResponse,
	string,
	{ rejectValue: string }
>('order/getOrderByNumber', async (orderNumber, { rejectWithValue }) => {
	try {
		return await getOrderByNumberRequest(orderNumber);
	} catch (error) {
		console.log(error);
		return rejectWithValue(
			(error as TErrorResponseData).message || errorMessages.GET_ORDER
		);
	}
});

export const initialState: TOrderSliceState = {
	order: null,
	isLoading: false,
	errorMessage: null,
};

export const orderSlice = createSlice({
	name: 'order',
	initialState: initialState,
	selectors: {
		getOrder: (state) => state.order,
		getOrderLoading: (state) => state.isLoading,
		getOrderErrorMessage: (state) => state.errorMessage,
	},
	reducers: {
		resetOrder(state) {
			state.order = initialState.order;
		},
		clearError(state) {
			state.errorMessage = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createOrder.pending, (state) => {
				state.isLoading = true;
				state.errorMessage = null;
			})
			.addCase(createOrder.fulfilled, (state, action) => {
				state.isLoading = false;
				state.order = action.payload.order;
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload;
			})
			.addCase(getOrderByNumber.pending, (state) => {
				state.isLoading = true;
				state.errorMessage = null;
			})
			.addCase(getOrderByNumber.fulfilled, (state, action) => {
				state.isLoading = false;
				state.order = action.payload.orders[0];
			})
			.addCase(getOrderByNumber.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload;
			});
	},
});

export const { resetOrder, clearError } = orderSlice.actions;
export const { getOrderLoading, getOrderErrorMessage, getOrder } =
	orderSlice.selectors;
export default orderSlice.reducer;
