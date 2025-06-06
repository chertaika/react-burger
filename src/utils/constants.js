const INGREDIENTS_API_URL = 'https://norma.nomoreparties.space/api/ingredients';
const CREATE_ORDER_API_URL = 'https://norma.nomoreparties.space/api/orders';
const dragTypes = {
	FILLING: 'filling',
	INGREDIENT: 'ingredient',
};
const routes = {
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

export { INGREDIENTS_API_URL, CREATE_ORDER_API_URL, dragTypes, routes };
