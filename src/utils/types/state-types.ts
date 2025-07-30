import { TBun, TFillings, TIngredients, TOrder, TUser } from '@utils/types';

export enum WebsocketStatus {
	CONNECTING = 'CONNECTING...',
	ONLINE = 'ONLINE',
	OFFLINE = 'OFFLINE',
}

export type TUserLoadingStates = {
	register: boolean;
	login: boolean;
	logout: boolean;
	changeUserInfo: boolean;
	checkUserAuth: boolean;
};

export type TErrorMessage = string | null | undefined;

export type TIngredientSliceState = {
	ingredients: TIngredients;
	isLoading: boolean;
	errorMessage: TErrorMessage;
};

export type TBurgerConstructorSliceState = {
	bun: TBun | null;
	fillings: TFillings;
};

export type TOrderSliceState = {
	isLoading: boolean;
	errorMessage: TErrorMessage;
	order: TOrder | null;
};

export type TUserSliceState = {
	user: TUser | null;
	isAuthChecked: boolean;
	errorMessage: TErrorMessage;
	loadingStates: TUserLoadingStates;
};

export type TOrdersSliceState = {
	status: WebsocketStatus;
	error: string | null;
	orders: Array<TOrder> | null;
	total?: number;
	totalToday?: number;
};
