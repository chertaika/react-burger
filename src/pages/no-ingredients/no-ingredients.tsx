import PlaceholderLayout from '@components/placeholder-layout/placeholder-layout';
import styles from './no-ingredients.module.css';
import { JSX } from 'react';

const NoIngredients = (): JSX.Element => (
	<PlaceholderLayout>
		<div className={styles.spaceship}>
			<div className={styles.cargo_hold}>
				<div className={styles.box} />
				<div className={styles.box} />
				<div className={styles.box} />
				<div className={styles.box} />
				<div className={styles.box} />
			</div>
			<div className={styles.topFin}></div>
			<div className={styles.bottomFin}></div>
			<div className={styles.exhaust}></div>
		</div>
		<h1 className='text text_type_main-large text_color_primary'>
			Межгалактическая поставка в пути
		</h1>
		<p className='text text_type_main-medium text_color_inactive'>
			Ингредиенты ещё не прибыли. Попробуйте сделать заказ позже!
		</p>
	</PlaceholderLayout>
);

export default NoIngredients;
