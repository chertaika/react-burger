import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	apiChangeUserInfo,
	apiGetUser,
	apiLogin,
	apiLogout,
	apiRegisterUser,
} from '@utils/api';
import { errorMessages } from '@utils/constants';

export const checkUserAuth = createAsyncThunk(
	'user/checkUserAuth',
	async (_, { dispatch }) => {
		if (localStorage.getItem('accessToken')) {
			try {
				const { user } = await apiGetUser();
				dispatch(setUser(user));
			} catch (error) {
				console.log(error);
			} finally {
				dispatch(setIsAuthChecked(true));
			}
		} else {
			dispatch(setIsAuthChecked(true));
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
					? 'Пользователь с таким email уже существует'
					: error.message || errorMessages.REGISTER;
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
					? 'Неверный логин или пароль'
					: error.message || errorMessages.LOGIN;
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
			return rejectWithValue(error.message);
		}
	}
);

export const changeUserInfo = createAsyncThunk(
	'user/changeUserInfo',
	async (userInfo, { dispatch, rejectWithValue }) => {
		try {
			const { user } = await apiChangeUserInfo(userInfo);
			dispatch(setUser(user));
		} catch (error) {
			return rejectWithValue(error.message || errorMessages.EDIT_USER);
		}
	}
);

const initialState = {
	user: null,
	isAuthChecked: false,
	errorMessage: null,
	loadingStates: {
		register: false,
		login: false,
		logout: false,
		changeUserInfo: false,
		checkUserAuth: false,
	},
};

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	selectors: {
		getUserInfo: (state) => state.user,
		getIsAuthChecked: (state) => state.isAuthChecked,
		getUserError: (state) => state.errorMessage,
		getLoadingStatus: (state) => state.loadingStates,
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setIsAuthChecked: (state, action) => {
			state.isAuthChecked = action.payload;
		},
		clearError(state) {
			state.errorMessage = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.loadingStates.register = true;
				state.errorMessage = null;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.loadingStates.register = false;
				state.user = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.user = initialState.user;
				state.loadingStates.register = false;
				state.errorMessage = action.payload;
			})
			.addCase(login.pending, (state) => {
				state.loadingStates.login = true;
				state.errorMessage = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loadingStates.login = false;
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.user = initialState.user;
				state.loadingStates.login = false;
				state.errorMessage = action.payload;
			})
			.addCase(logout.pending, (state) => {
				state.loadingStates.logout = true;
				state.errorMessage = null;
			})
			.addCase(logout.fulfilled, (state) => {
				state.loadingStates.logout = false;
				state.user = initialState.user;
			})
			.addCase(logout.rejected, (state, action) => {
				state.loadingStates.logout = false;
				state.errorMessage = action.payload;
			})
			.addCase(changeUserInfo.pending, (state) => {
				state.loadingStates.changeUserInfo = true;
				state.errorMessage = null;
			})
			.addCase(changeUserInfo.fulfilled, (state) => {
				state.loadingStates.changeUserInfo = false;
			})
			.addCase(changeUserInfo.rejected, (state, action) => {
				state.loadingStates.changeUserInfo = false;
				state.errorMessage = action.payload;
			});
	},
});

export const { clearError, setUser, setIsAuthChecked } = userSlice.actions;
export const { getLoadingStatus, getUserInfo, getUserError, getIsAuthChecked } =
	userSlice.selectors;
export default userSlice.reducer;
