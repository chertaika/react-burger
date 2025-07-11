import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrderRequest } from '@utils/api';
import { getBun, getFillings } from '@store/burger-constructor-slice';
import { errorMessages } from '@utils/constants';

export const createOrder = createAsyncThunk(
	'order/createOrder',
	async (_, { getState, rejectWithValue }) => {
		try {
			const state = getState();
			const bun = getBun(state);
			const fillings = getFillings(state);

			const ingredients = [
				...(bun ? [bun._id, bun._id] : []),
				...fillings.map((filling) => filling._id),
			];

			return await createOrderRequest(ingredients);
		} catch (error) {
			console.log(error);
			return rejectWithValue(error.message || errorMessages.CREATE_ORDER);
		}
	}
);

const initialState = {
	orderNumber: null,
	orderName: null,
	isLoading: false,
	errorMessage: null,
};

const orderSlice = createSlice({
	name: 'order',
	initialState: initialState,
	selectors: {
		getOrderNumber: (state) => state.orderNumber,
		getOrderName: (state) => state.orderName,
		getOrderLoading: (state) => state.isLoading,
		getOrderErrorMessage: (state) => state.errorMessage,
	},
	reducers: {
		resetOrder(state) {
			state.orderNumber = initialState.orderNumber;
			state.orderName = initialState.orderName;
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
				state.orderNumber = action.payload.order.number;
				state.orderName = action.payload.name;
			})
			.addCase(createOrder.rejected, (state, action) => {
				resetOrder(state);
				state.isLoading = false;
				state.errorMessage = action.payload;
			});
	},
});

export const { resetOrder, clearError } = orderSlice.actions;
export const {
	getOrderNumber,
	getOrderName,
	getOrderLoading,
	getOrderErrorMessage,
} = orderSlice.selectors;
export default orderSlice.reducer;
