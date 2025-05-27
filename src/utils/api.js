import { CREATE_ORDER_API_URL, INGREDIENTS_API_URL } from '@utils/constants.js';

const checkResponse = async (res, context = 'Неизвестная ошибка') => {
	if (res.ok) {
		return res.json();
	}

	let errorMessage = `${context}: Статус ${res.status}`;

	try {
		const errorData = await res.json();
		if (errorData.message) {
			errorMessage = `${context}: ${errorData.message}`;
		}
	} catch (e) {
		errorMessage = `${context}: Статус ${res.status}`;
	}

	return Promise.reject(errorMessage);
};

const getInitialData = async () => {
	const res = await fetch(INGREDIENTS_API_URL);
	return checkResponse(res, 'Ошибка получения ингредиентов');
};

const createOrderRequest = async (ingredients) => {
	const res = await fetch(CREATE_ORDER_API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ ingredients }),
	});
	return checkResponse(res, 'Ошибка отправки заказа');
};

export { getInitialData, createOrderRequest };
