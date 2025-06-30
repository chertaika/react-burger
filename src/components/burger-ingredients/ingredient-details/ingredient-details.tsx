import styles from './ingredient-details.module.css';
import { JSX, useState } from 'react';
import Preloader from '@components/preloader/preloader';
import imageError from '@images/no-photo.svg';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
// @ts-expect-error: TS7016: Could not find a declaration file for module @store/ingredients-slice
import { getAllIngredients } from '@store/ingredients-slice';
import { TIngredients } from '@utils/types';

const IngredientDetails = (): JSX.Element => {
	const { id } = useParams();
	const ingredients: TIngredients = useSelector(getAllIngredients);

	const currentIngredient = ingredients.find(
		(ingredient) => ingredient._id === id
	);

	const [isImageError, setIsImageError] = useState<boolean>(false);
	const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

	const handleImageError = (): void => {
		setIsImageError(true);
	};

	const handleImageLoading = (): void => {
		setIsImageLoading(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.image_container}>
				{isImageLoading && (
					<div className={styles.image_loader}>
						<Preloader />
					</div>
				)}
				<img
					className={isImageError ? styles.no_image : styles.image}
					src={isImageError ? imageError : `${currentIngredient?.image_large}`}
					alt={isImageError ? 'no image' : currentIngredient?.name}
					onLoad={handleImageLoading}
					onError={handleImageError}
				/>
			</div>
			<span className={`${styles.title} text text_type_main-medium mt-4 mb-8`}>
				{currentIngredient?.name}
			</span>
			<ul className={styles.nutrition}>
				<li className={styles.nutrition_item}>
					<span className={'text text_type_main-default'}>Калории, ккал</span>
					<span className={'text text_type_main-default'}>
						{currentIngredient?.calories}
					</span>
				</li>
				<li className={styles.nutrition_item}>
					<span className={'text text_type_main-default'}>Белки, г</span>
					<span className={'text text_type_main-default'}>
						{currentIngredient?.proteins}
					</span>
				</li>
				<li className={styles.nutrition_item}>
					<span className={'text text_type_main-default'}>Жиры, г</span>
					<span className={'text text_type_main-default'}>
						{currentIngredient?.fat}
					</span>
				</li>
				<li className={styles.nutrition_item}>
					<span className={'text text_type_main-default'}>Углеводы, г</span>
					<span className={'text text_type_main-default'}>
						{currentIngredient?.carbohydrates}
					</span>
				</li>
			</ul>
		</div>
	);
};

export default IngredientDetails;
