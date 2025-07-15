export type TUser = {
	email: string;
	name?: string;
};
export type TPassword = {
	password: string;
};
export type TUserWithPassword = TUser & TPassword;

export type TResetPassword = TPassword & {
	token: string;
};
