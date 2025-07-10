import { TBun, TFillings, TIngredients, TUser } from '@utils/types';

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
	orderNumber: number | null;
	orderName: string | null;
	isLoading: boolean;
	errorMessage: TErrorMessage;
};

export type TUserSliceState = {
	user: TUser | null;
	isAuthChecked: boolean;
	errorMessage: TErrorMessage;
	loadingStates: TUserLoadingStates;
};
