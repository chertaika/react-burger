import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiGetUser, apiLogin, apiLogout, apiRegisterUser } from '@utils/api';

export const getUser = createAsyncThunk(
	'user/getUser',
	async (_, { rejectWithValue }) => {
		try {
			const { user } = await apiGetUser();
			return user;
		} catch (error) {
			return rejectWithValue(`${error.message}: Статус ${error.status}`);
		}
	}
);

export const register = createAsyncThunk(
	'user/register',
	async (userData, { rejectWithValue }) => {
		try {
			const { user, accessToken, refreshToken } =
				await apiRegisterUser(userData);
			localStorage.setItem('accessToken', accessToken.split('Bearer ')[1]);
			localStorage.setItem('refreshToken', refreshToken);
			return user;
		} catch (error) {
			const errorMessage =
				error.status === 403
					? `${error.message}: пользователь с таким email уже существует `
					: `${error.message}: Статус ${error.status}`;
			return rejectWithValue(errorMessage);
		}
	}
);

export const login = createAsyncThunk(
	'user/login',
	async (userData, { rejectWithValue }) => {
		try {
			const { user, accessToken, refreshToken } = await apiLogin(userData);
			localStorage.setItem('accessToken', accessToken.split('Bearer ')[1]);
			localStorage.setItem('refreshToken', refreshToken);
			return user;
		} catch (error) {
			const errorMessage =
				error.status === 401
					? `${error.message}: неверный логин или пароль`
					: `${error.message}: Статус ${error.status}`;
			return rejectWithValue(errorMessage);
		}
	}
);

export const logout = createAsyncThunk(
	'user/logout',
	async (_, { rejectWithValue }) => {
		try {
			await apiLogout();
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
		} catch (error) {
			return rejectWithValue(`${error.message}: Статус ${error.status}`);
		}
	}
);

const initialState = {
	user: null,
	isLoading: false,
	errorMessage: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	selectors: {
		getUserInfo: (state) => state.user,
		getUserLoading: (state) => state.isLoading,
		getUserError: (state) => state.errorMessage,
	},
	reducers: {
		clearError(state) {
			state.errorMessage = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUser.pending, (state) => {
				state.isLoading = true;
				state.errorMessage = null;
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
			})
			.addCase(getUser.rejected, (state) => {
				state.user = initialState.user;
				state.isLoading = false;
			})
			.addCase(register.pending, (state) => {
				state.isLoading = true;
				state.errorMessage = null;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.user = initialState.user;
				state.isLoading = false;
				state.errorMessage = action.payload;
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
				state.errorMessage = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.user = initialState.user;
				state.isLoading = false;
				state.errorMessage = action.payload;
			})
			.addCase(logout.pending, (state) => {
				state.isLoading = true;
				state.errorMessage = null;
			})
			.addCase(logout.fulfilled, (state) => {
				state.isLoading = false;
				state.user = initialState.user;
			})
			.addCase(logout.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload;
			});
	},
});

export const { clearError } = userSlice.actions;
export const { getUserInfo, getUserError, getUserLoading } =
	userSlice.selectors;
export default userSlice.reducer;
