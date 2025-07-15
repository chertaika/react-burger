export type TIngredientType = 'bun' | 'main' | 'sauce';
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
export type TFilling = TDraggedIngredient<Exclude<TIngredientType, 'bun'>>;
export type TFillings = Array<TFilling>;
export type TBun = TDraggedIngredient<'bun'>;
export type TIngredientsCount = Partial<Record<TIngredient['_id'], number>>;
