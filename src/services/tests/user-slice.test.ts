import { TUserSliceState } from '@utils/types';
import { testUser, testUserWithPassword } from '@utils/test-constants';
import {
	userSlice,
	setUser,
	setIsAuthChecked,
	clearError,
	register,
	login,
	logout,
	changeUserInfo,
	initialState,
} from '../user-slice';

const localStorageMock = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	removeItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('userSlice reducers', () => {
	it('setUser should update user', () => {
		const user = testUser;
		const state = userSlice.reducer(initialState, setUser(user));

		expect(state.user).toEqual(user);
		expect(state.isAuthChecked).toBe(initialState.isAuthChecked);
		expect(state.errorMessage).toBe(initialState.errorMessage);
		expect(state.loadingStates).toEqual(initialState.loadingStates);
	});

	it('setIsAuthChecked should update isAuthChecked', () => {
		const state = userSlice.reducer(initialState, setIsAuthChecked(true));

		expect(state.isAuthChecked).toBe(true);
		expect(state.user).toBe(initialState.user);
		expect(state.errorMessage).toBe(initialState.errorMessage);
		expect(state.loadingStates).toEqual(initialState.loadingStates);
	});

	it('clearError should clear errorMessage', () => {
		const modifiedState: TUserSliceState = {
			...initialState,
			errorMessage: 'error',
		};
		const state = userSlice.reducer(modifiedState, clearError());

		expect(state.errorMessage).toBeNull();
		expect(state.user).toBe(initialState.user);
		expect(state.isAuthChecked).toBe(initialState.isAuthChecked);
		expect(state.loadingStates).toEqual(initialState.loadingStates);
	});

	describe('register', () => {
		it('pending should set loading and clear error', () => {
			const state = userSlice.reducer(
				initialState,
				register.pending('', testUserWithPassword)
			);
			expect(state.loadingStates.register).toBe(true);
			expect(state.errorMessage).toBeNull();
		});

		it('fulfilled should set user and stop loading', () => {
			const state = userSlice.reducer(
				{
					...initialState,
					loadingStates: { ...initialState.loadingStates, register: true },
				},
				register.fulfilled(testUser, '', testUserWithPassword)
			);
			expect(state.user).toEqual(testUser);
			expect(state.loadingStates.register).toBe(false);
		});

		it('rejected should reset user, stop loading and set error', () => {
			const errorMessage = 'Ошибка регистрации';
			const state = userSlice.reducer(
				{
					...initialState,
					loadingStates: { ...initialState.loadingStates, register: true },
				},
				register.rejected(null, '', testUserWithPassword, errorMessage)
			);
			expect(state.user).toBeNull();
			expect(state.loadingStates.register).toBe(false);
			expect(state.errorMessage).toBe(errorMessage);
		});
	});

	describe('login', () => {
		it('pending should set loading and clear error', () => {
			const state = userSlice.reducer(
				initialState,
				login.pending('', testUserWithPassword)
			);
			expect(state.loadingStates.login).toBe(true);
			expect(state.errorMessage).toBeNull();
		});

		it('fulfilled should set user and stop loading', () => {
			const state = userSlice.reducer(
				{
					...initialState,
					loadingStates: { ...initialState.loadingStates, login: true },
				},
				login.fulfilled(testUser, '', testUserWithPassword)
			);
			expect(state.user).toEqual(testUser);
			expect(state.loadingStates.login).toBe(false);
		});

		it('rejected should reset user, stop loading and set error', () => {
			const errorMessage = 'Ошибка входа';
			const state = userSlice.reducer(
				{
					...initialState,
					loadingStates: { ...initialState.loadingStates, login: true },
				},
				login.rejected(null, '', testUserWithPassword, errorMessage)
			);
			expect(state.user).toBeNull();
			expect(state.loadingStates.login).toBe(false);
			expect(state.errorMessage).toBe(errorMessage);
		});
	});

	describe('logout', () => {
		it('pending should set loading and clear error', () => {
			const state = userSlice.reducer(
				initialState,
				logout.pending('', undefined)
			);
			expect(state.loadingStates.logout).toBe(true);
			expect(state.errorMessage).toBeNull();
		});

		it('fulfilled should reset user and stop loading', () => {
			const prevState: TUserSliceState = {
				...initialState,
				user: testUser,
				loadingStates: { ...initialState.loadingStates, logout: true },
			};
			const state = userSlice.reducer(
				prevState,
				logout.fulfilled(undefined, '', undefined)
			);
			expect(state.user).toBeNull();
			expect(state.loadingStates.logout).toBe(false);
		});

		it('rejected should stop loading and set error', () => {
			const errorMessage = 'Ошибка выхода';
			const state = userSlice.reducer(
				{
					...initialState,
					loadingStates: { ...initialState.loadingStates, logout: true },
				},
				logout.rejected(null, '', undefined, errorMessage)
			);
			expect(state.loadingStates.logout).toBe(false);
			expect(state.errorMessage).toBe(errorMessage);
		});
	});

	describe('changeUserInfo', () => {
		it('pending should set loading and clear error', () => {
			const state = userSlice.reducer(
				initialState,
				changeUserInfo.pending('', testUserWithPassword)
			);
			expect(state.loadingStates.changeUserInfo).toBe(true);
			expect(state.errorMessage).toBeNull();
		});

		it('fulfilled should stop loading', () => {
			const state = userSlice.reducer(
				{
					...initialState,
					loadingStates: {
						...initialState.loadingStates,
						changeUserInfo: true,
					},
				},
				changeUserInfo.fulfilled(undefined, '', testUserWithPassword)
			);
			expect(state.loadingStates.changeUserInfo).toBe(false);
		});

		it('rejected should stop loading and set error', () => {
			const errorMessage = 'Ошибка';
			const state = userSlice.reducer(
				{
					...initialState,
					loadingStates: {
						...initialState.loadingStates,
						changeUserInfo: true,
					},
				},
				changeUserInfo.rejected(null, '', testUserWithPassword, errorMessage)
			);
			expect(state.loadingStates.changeUserInfo).toBe(false);
			expect(state.errorMessage).toBe(errorMessage);
		});
	});
});
