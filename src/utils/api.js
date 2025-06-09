import axios from 'axios';
import { api } from '@utils/constants.js';
import Promise from 'lodash-es/_Promise';

const $api = axios.create({
	baseURL: api.BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

$api.interceptors.request.use((config) => {
	const token = localStorage.getItem('accessToken');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

$api.interceptors.response.use(
	(response) => response.data,
	async (error) => {
		const originalRequest = error.config;
		const errorMessage = error.response?.data?.message || '';
		const customMessage = originalRequest.errorContext || 'Ошибка запроса';

		if (errorMessage === 'jwt expired' && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const { accessToken, refreshToken } = await $api.post(
					api.REFRESH_TOKEN_URL,
					{
						token: localStorage.getItem('refreshToken'),
					}
				);

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
			message: customMessage,
			status: serverStatus,
		});
	}
);

export const apiGetInitialData = () =>
	$api.get(api.INGREDIENTS_URL, {
		errorContext: 'Ошибка получения ингредиентов',
	});

export const createOrderRequest = (ingredients) =>
	$api.post(
		api.CREATE_ORDER_URL,
		{ ingredients },
		{
			errorContext: 'Ошибка создания заказа',
		}
	);

export const apiGetUser = () => $api.get(api.GET_USER_URL);

export const apiRegisterUser = ({ name, email, password }) =>
	$api.post(
		api.REGISTER_URL,
		{ name, email, password },
		{
			errorContext: 'Ошибка регистрации',
		}
	);

export const apiLogin = (userData) =>
	$api.post(api.LOGIN_URL, userData, {
		errorContext: 'Ошибка авторизации',
	});

export const apiLogout = () =>
	$api.post(api.LOGOUT_URL, {
		token: localStorage.getItem('refreshToken'),
	});
