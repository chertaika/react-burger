import { TUser } from '@utils/types';

type TTimestamps = {
	readonly createdAt: string;
	readonly updatedAt: string;
};

export type TOrderStatus = 'pending' | 'created' | 'done';

export type TOrder = TTimestamps & {
	ingredients: Array<string>;
	name: string;
	number: number;
	owner: TUser & TTimestamps;
	price: number;
	status: TOrderStatus;
	_id: string;
};
