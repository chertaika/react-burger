import React from 'react';
import { useStars } from '@/hooks/useStars';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './under-development.module.css';

const UnderDevelopment = () => {
	const stars = useStars(60, 4);
	return (
		<div className={styles.container}>
			{stars}
			<div className={styles.content}>
				<div className={styles.galaxy}>
					<div className={styles.sun} />
					<div>
						<div className={styles.planet}></div>
						<div className={styles.planet}></div>
						<div className={styles.planet}></div>
						<div className={styles.planet}></div>
					</div>
				</div>
				<h1 className='text text_type_main-large text_color_primary'>
					Галактический раздел в работе
				</h1>
				<p
					className={`${styles.text} text text_type_main-medium text_color_inactive`}>
					Упс! Эта часть галактики ещё формируется. Скоро здесь появятся новые
					звёзды и вкусы!
				</p>
				<Button htmlType='button' type='primary' size='medium'>
					<Link to='/' className='text_color_primary'>
						Вернуться в домашнюю галактику
					</Link>
				</Button>
			</div>
		</div>
	);
};

export default UnderDevelopment;
