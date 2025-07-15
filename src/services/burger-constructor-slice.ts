import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	TBun,
	TBurgerConstructorSliceState,
	TFilling,
	TIngredientsCount,
} from '@utils/types';
import { createAppSelector } from '@store/hooks';

const initialState: TBurgerConstructorSliceState = {
	bun: null,
	fillings: [],
};

const burgerConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState: initialState,
	selectors: {
		getBun: (state) => state.bun,
		getFillings: (state) => state.fillings,
	},
	reducers: {
		addBun(state, action: PayloadAction<TBun>) {
			state.bun = action.payload;
		},
		addFilling(state, action: PayloadAction<TFilling>) {
			state.fillings.push(action.payload);
		},
		removeFilling(state, action: PayloadAction<string>) {
			state.fillings = state.fillings.filter(
				(item) => item.uid !== action.payload
			);
		},
		moveFilling(
			state,
			action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
		) {
			const { dragIndex, hoverIndex } = action.payload;
			const [movedItem] = state.fillings.splice(dragIndex, 1);
			state.fillings.splice(hoverIndex, 0, movedItem);
		},
		resetConstructor: () => initialState,
	},
});

export const getIngredientsCount = createAppSelector(
	[
		(state) => state.burgerConstructor.bun,
		(state) => state.burgerConstructor.fillings,
	],
	(bun, fillings) => {
		const counts: TIngredientsCount = {};

		if (bun) {
			counts[bun._id] = 2;
		}

		fillings.forEach((item) => {
			counts[item._id] = (counts[item._id] || 0) + 1;
		});

		return counts;
	}
);

export const getTotalPrice = createAppSelector(
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
