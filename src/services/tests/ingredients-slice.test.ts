import {
	ingredientsSlice,
	getIngredients,
	initialState,
} from '../ingredients-slice';
import { TIngredientSliceState } from '@utils/types';
import { testIngredients } from '@utils/test-constants';

jest.mock('@utils/api', () => ({
	apiGetInitialData: jest.fn(),
}));

describe('ingredientsSlice reducers', () => {
	describe('getIngredients', () => {
		it('pending should set isLoading to true and clear error', () => {
			const modifiedState: TIngredientSliceState = {
				...initialState,
				errorMessage: 'error',
				ingredients: testIngredients,
			};
			const state = ingredientsSlice.reducer(
				modifiedState,
				getIngredients.pending('')
			);

			expect(state.isLoading).toBe(true);
			expect(state.errorMessage).toBeNull();
			expect(state.ingredients).toEqual(modifiedState.ingredients);
		});

		it('fulfilled should set ingredients and clear loading', () => {
			const payload = testIngredients;
			const state = ingredientsSlice.reducer(
				initialState,
				getIngredients.fulfilled(payload, '')
			);

			expect(state.isLoading).toBe(false);
			expect(state.ingredients).toEqual(payload);
			expect(state.errorMessage).toBeNull();
		});

		it('rejected should reset ingredients and set error', () => {
			const errorMessage = 'Failed to fetch';
			const state = ingredientsSlice.reducer(
				initialState,
				getIngredients.rejected(new Error(), '', undefined, errorMessage)
			);

			expect(state.isLoading).toBe(false);
			expect(state.ingredients).toEqual([]);
			expect(state.errorMessage).toBe(errorMessage);
		});
	});
});
