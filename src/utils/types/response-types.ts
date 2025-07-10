import { TUser, TIngredients, TOrder } from '@utils/types';

export type TResponse = {
	success: boolean;
	message?: string;
};

export type TErrorResponseData = {
	message?: string;
	status?: number;
};

export type TUserResponse = TResponse & {
	user: TUser;
};

export type TIngredientsResponse = TResponse & {
	data: TIngredients;
};

export type TOrderResponse = {
	name: string;
	order: TOrder;
	success: boolean;
};

export type TUserWithTokenResponse = TUserResponse & {
	accessToken: string;
	refreshToken: string;
};
