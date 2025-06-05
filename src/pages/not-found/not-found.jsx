import { useEffect } from 'react';
import styles from './not-found.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

const NotFound = () => {
	useEffect(() => {
		const starsContainer = document.getElementById('stars');
		for (let i = 0; i < 100; i++) {
			const star = document.createElement('div');
			const size = `${Math.random() * 4}px`;
			star.className = styles.star;
			star.style.width = size;
			star.style.height = size;
			star.style.left = `${Math.random() * 100}%`;
			star.style.top = `${Math.random() * 100}%`;
			star.style.animationDelay = `${Math.random() * 2}s`;
			starsContainer.appendChild(star);
		}
	}, []);

	return (
		<div className={styles.not_found}>
			<div className={styles.stars} id='stars'></div>
			<div className={styles.container}>
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
					Упс! Этот космический бургер улетел в чёрную дыру!
				</p>
				<Button htmlType={'button'}>
					<Link to={'/'} className={'text_color_primary'}>
						Вернуться в домашнюю галактику
					</Link>
				</Button>
			</div>
		</div>
	);
};

export default NotFound;
