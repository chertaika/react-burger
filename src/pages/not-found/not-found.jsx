import styles from './not-found.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { routes } from '@utils/constants';
import { useStars } from '@/hooks/useStars';

const NotFound = () => {
	const stars = useStars(100, 5);

	return (
		<div className={styles.container}>
			{stars}
			<div className={styles.content}>
				<div className={styles.burger}>
					<div className={styles.bun_top}></div>
					<div className={styles.salad}></div>
					<div className={styles.meat}></div>
					<div className={styles.bun_bottom}></div>
				</div>
				<h1 className={'text text_type_main-large text_color_primary'}>
					404 - Бургер не найден
				</h1>
				<p className={'text text_type_main-medium text_color_inactive'}>
					Упс! Кажется, ты заблудился в межзвёздном пространстве.
				</p>
				<Button htmlType={'button'}>
					<Link to={routes.HOME} className={'text_color_primary'}>
						Вернуться в домашнюю галактику
					</Link>
				</Button>
			</div>
		</div>
	);
};

export default NotFound;
