import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { api } from '@utils/constants';
import {
	TErrorResponseData,
	TIngredients,
	TIngredientsResponse,
	TOrderResponse,
	TResetPassword,
	TResponse,
	TUser,
	TUserResponse,
	TUserWithPassword,
	TUserWithTokenResponse,
} from '@utils/types';

declare module 'axios' {
	export interface InternalAxiosRequestConfig {
		_retry: boolean;
	}
}

const $api = axios.create({
	baseURL: api.BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

$api.interceptors.request.use((config) => {
	const token = localStorage.getItem('accessToken');
	config.headers.Authorization = `Bearer ${token}`;
	return config;
});

$api.interceptors.response.use(
	(response) => response.data,
	async (error: AxiosError<TErrorResponseData>) => {
		if (!error.config) return Promise.reject(error);

		const originalRequest: InternalAxiosRequestConfig = error.config;
		const errorMessage: string | undefined = error.response?.data?.message;

		if (errorMessage === 'jwt expired' && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const {
					data: { accessToken, refreshToken },
				} = await $api.post<TUserWithTokenResponse>(api.REFRESH_TOKEN_URL, {
					token: localStorage.getItem('refreshToken'),
				});

				localStorage.setItem('accessToken', accessToken.split('Bearer ')[1]);
				localStorage.setItem('refreshToken', refreshToken);

				originalRequest.headers.Authorization = accessToken;
				return $api(originalRequest);
			} catch (refreshError) {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				return Promise.reject('Сессия истекла. Войдите снова.');
			}
		}

		const serverStatus = error.response?.data?.status || error.status;
		return Promise.reject({
			message: errorMessage,
			status: serverStatus,
		});
	}
);

export const apiGetInitialData = (): Promise<TIngredientsResponse> =>
	$api.get(api.INGREDIENTS_URL);

export const createOrderRequest = (
	ingredients: TIngredients
): Promise<TOrderResponse> => $api.post(api.CREATE_ORDER_URL, { ingredients });

export const apiGetUser = (): Promise<TUserResponse> => $api.get(api.USER_URL);

export const apiChangeUserInfo = (
	userInfo: TUserWithPassword
): Promise<TUserResponse> => $api.patch(api.USER_URL, userInfo);

export const apiRegisterUser = (
	userData: TUserWithPassword
): Promise<TUserWithTokenResponse> => $api.post(api.REGISTER_URL, userData);

export const apiLogin = (
	userData: TUserWithPassword
): Promise<TUserWithTokenResponse> => $api.post(api.LOGIN_URL, userData);

export const apiLogout = (): Promise<TResponse> =>
	$api.post(api.LOGOUT_URL, {
		token: localStorage.getItem('refreshToken'),
	});

export const apiRestorePassword = (emailData: TUser): Promise<TResponse> =>
	$api.post(api.RESTORE_PASSWORD_URL, emailData);

export const apiResetPassword = (
	passwordData: TResetPassword
): Promise<TResponse> => $api.post(api.RESET_PASSWORD_URL, passwordData);
