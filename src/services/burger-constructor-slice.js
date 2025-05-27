import { createSelector, createSlice } from '@reduxjs/toolkit';

const burgerConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState: {
		bun: null,
		fillings: [],
	},
	selectors: {
		getBun: (state) => state.bun,
		getFillings: (state) => state.fillings,
	},
	reducers: {
		addBun(state, action) {
			state.bun = action.payload;
		},
		addFilling(state, action) {
			state.fillings.push(action.payload);
		},
		removeFilling(state, action) {
			state.fillings = state.fillings.filter(
				(item) => item.uid !== action.payload
			);
		},
		moveFilling(state, action) {
			const { dragIndex, hoverIndex } = action.payload;
			const newFillings = [...state.fillings];
			const [movedItem] = newFillings.splice(dragIndex, 1);
			newFillings.splice(hoverIndex, 0, movedItem);
			state.fillings = newFillings;
		},
		resetConstructor(state) {
			state.bun = null;
			state.fillings = [];
		},
	},
});

export const getIngredientsCount = createSelector(
	[
		(state) => state.burgerConstructor.bun,
		(state) => state.burgerConstructor.fillings,
	],
	(bun, fillings) => {
		const counts = {};

		if (bun) {
			counts[bun._id] = 2;
		}

		fillings.forEach((item) => {
			counts[item._id] = (counts[item._id] || 0) + 1;
		});

		return counts;
	}
);

export const getTotalPrice = createSelector(
	[
		(state) => state.burgerConstructor.bun,
		(state) => state.burgerConstructor.fillings,
	],
	(bun, fillings) => {
		let totalPrice = 0;

		if (bun) {
			totalPrice += bun.price * 2;
		}

		fillings.forEach((filling) => {
			totalPrice += filling.price;
		});

		return totalPrice;
	}
);

export const {
	addBun,
	addFilling,
	removeFilling,
	moveFilling,
	resetConstructor,
} = burgerConstructorSlice.actions;
export const { getBun, getFillings } = burgerConstructorSlice.selectors;
export default burgerConstructorSlice.reducer;
