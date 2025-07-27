import {
	burgerConstructorSlice,
	addBun,
	addFilling,
	removeFilling,
	moveFilling,
	resetConstructor,
	initialState,
} from '../burger-constructor-slice';
import { testBun, testCheese, testMeet } from '@utils/test-constants';

describe('burgerConstructorSlice reducers', () => {
	test('addBun should set bun', () => {
		const state = burgerConstructorSlice.reducer(initialState, addBun(testBun));

		expect(state.bun).toEqual(testBun);
		expect(state.fillings).toEqual(initialState.fillings);
	});

	test('addFilling should add filling to array', () => {
		const state = burgerConstructorSlice.reducer(
			initialState,
			addFilling(testMeet)
		);

		expect(state.fillings).toEqual([testMeet]);
		expect(state.bun).toBe(initialState.bun);
	});

	test('removeFilling should remove filling by uid', () => {
		const modifiedState = {
			...initialState,
			fillings: [testMeet],
		};
		const state = burgerConstructorSlice.reducer(
			modifiedState,
			removeFilling(testMeet.uid)
		);

		expect(state.fillings).toEqual([]);
		expect(state.bun).toBe(initialState.bun);
	});

	test('moveFilling should reorder fillings', () => {
		const modifiedState = {
			...initialState,
			fillings: [testMeet, testCheese],
		};
		const state = burgerConstructorSlice.reducer(
			modifiedState,
			moveFilling({ dragIndex: 0, hoverIndex: 1 })
		);

		expect(state.fillings).toEqual([testCheese, testMeet]);
		expect(state.bun).toBe(initialState.bun);
	});

	test('resetConstructor should reset to initial state', () => {
		const modifiedState = {
			...initialState,
			bun: testBun,
			fillings: [testMeet],
		};
		const state = burgerConstructorSlice.reducer(
			modifiedState,
			resetConstructor()
		);

		expect(state).toEqual(initialState);
	});
});
