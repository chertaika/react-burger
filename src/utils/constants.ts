export const dragTypes = {
	FILLING: 'filling',
	INGREDIENT: 'ingredient',
};

export const api = {
	BASE_URL: 'https://norma.nomoreparties.space/api',
	INGREDIENTS_URL: '/ingredients',
	CREATE_ORDER_URL: '/orders',
	REGISTER_URL: '/auth/register',
	LOGIN_URL: '/auth/login',
	LOGOUT_URL: '/auth/logout',
	REFRESH_TOKEN_URL: '/auth/token',
	USER_URL: '/auth/user',
	RESTORE_PASSWORD_URL: '/password-reset',
	RESET_PASSWORD_URL: '/password-reset/reset',
};

export const routes = {
	HOME: '/',
	PROFILE: '/profile',
	PROFILE_ORDERS: 'orders',
	LOGIN: '/login',
	REGISTER: '/register',
	FORGOT_PASSWORD: '/forgot-password',
	RESET_PASSWORD: '/reset-password',
	INGREDIENTS: '/ingredients',
	INGREDIENT: '/ingredients/:id',
	FEED: '/feed',
};

export const errorMessages = {
	EDIT_USER: 'Ошибка изменения данных',
	CREATE_ORDER: 'Ошибка создания заказа',
	LOGIN: 'Ошибка авторизации',
	REGISTER: 'Ошибка регистрации',
	RESTORE_PASSWORD: 'Ошибка восстановления пароля',
	RESET_PASSWORD: 'Ошибка обновления пароля',
	GET_INGREDIENTS: 'Ошибка получения ингредиентов',
};

export const EMAIL_REGEX =
	'^[a-zA-Z0-9+_.\\-]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]{2,4}$';

export const ingredientTypeTranslations = {
	bun: 'Булки',
	sauce: 'Соусы',
	main: 'Начинки',
};
