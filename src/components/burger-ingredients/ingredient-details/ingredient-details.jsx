import styles from './ingredient-details.module.css';
import { useState } from 'react';
import Preloader from '@components/preloader/preloader.jsx';
import imageError from '@images/no-photo.svg';
import { ingredientPropType } from '@utils/prop-types.js';

const IngredientDetails = ({ ingredient }) => {
	const [isImageError, setIsImageError] = useState(false);
	const [isImageLoading, setIsImageLoading] = useState(true);

	const handleImageError = () => {
		setIsImageError(true);
	};

	const handleImageLoading = () => {
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
					src={isImageError ? imageError : `${ingredient.image_large}`}
					alt={isImageError ? 'no image' : ingredient.name}
					onLoad={handleImageLoading}
					onError={handleImageError}
				/>
			</div>
			<span className={`${styles.title} text text_type_main-medium mt-4 mb-8`}>
				{ingredient.name}
			</span>
			<ul className={styles.nutrition}>
				<li className={styles.nutrition_item}>
					<span className={'text text_type_main-default'}>Калории, ккал</span>
					<span className={'text text_type_main-default'}>
						{ingredient.calories}
					</span>
				</li>
				<li className={styles.nutrition_item}>
					<span className={'text text_type_main-default'}>Белки, г</span>
					<span className={'text text_type_main-default'}>
						{ingredient.proteins}
					</span>
				</li>
				<li className={styles.nutrition_item}>
					<span className={'text text_type_main-default'}>Жиры, г</span>
					<span className={'text text_type_main-default'}>
						{ingredient.fat}
					</span>
				</li>
				<li className={styles.nutrition_item}>
					<span className={'text text_type_main-default'}>Углеводы, г</span>
					<span className={'text text_type_main-default'}>
						{ingredient.carbohydrates}
					</span>
				</li>
			</ul>
		</div>
	);
};

IngredientDetails.propTypes = {
	ingredient: ingredientPropType.isRequired,
};

export default IngredientDetails;
