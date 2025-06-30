export type TIngredientType = 'bun' | 'main' | 'sauce';

type TTimestamps = {
	readonly createdAt: string;
	readonly updatedAt: string;
};

export type TIngredient<T extends TIngredientType = TIngredientType> = {
	readonly _id: string;
	readonly name: string;
	readonly type: T;
	readonly proteins: number;
	readonly fat: number;
	readonly carbohydrates: number;
	readonly calories: number;
	readonly price: number;
	readonly image: string;
	readonly image_large: string;
	readonly image_mobile: string;
	readonly __v: number;
};
export type TIngredients = Array<TIngredient>;

export type TDraggedIngredient<T extends TIngredientType = TIngredientType> =
	TIngredient<T> & {
		readonly uid: string;
	};

export type TFillings = Array<
	TDraggedIngredient<Exclude<TIngredientType, 'bun'>>
>;
export type TBun = TDraggedIngredient<'bun'>;

export type TIngredientsCount = Partial<Record<TIngredient['_id'], number>>;

export type TUser = {
	email: string;
	name?: string;
};

export type TOrder = TTimestamps & {
	ingredients: TIngredients;
	name: string;
	number: number;
	owner: TUser & TTimestamps;
	price: number;
	status: string;
	_id: string;
};

export type TPassword = {
	password: string;
};

export type TUserWithPassword = TUser & TPassword;

export type TResetPassword = TPassword & {
	token: string;
};

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

export type TOrderResponse = TResponse & {
	order: TOrder;
	name: string;
};

export type TUserWithTokenResponse = TUserResponse & {
	accessToken: string;
	refreshToken: string;
};

export type TUserLoadingStates = {
	register: boolean;
	login: boolean;
	logout: boolean;
	changeUserInfo: boolean;
	checkUserAuth: boolean;
};
