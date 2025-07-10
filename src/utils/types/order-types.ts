import { TIngredients, TUser } from '@utils/types';

type TTimestamps = {
	readonly createdAt: string;
	readonly updatedAt: string;
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
