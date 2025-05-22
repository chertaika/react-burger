import { INGREDIENTS_API_URL } from '@utils/constants.js';

const checkResponse = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject('Ошибка получения данных. Статус: ' + res.status);
};

const getInitialData = async () => {
	const res = await fetch(INGREDIENTS_API_URL);
	return checkResponse(res);
};

export default getInitialData;
