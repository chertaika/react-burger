import React from 'react';
import styles from './auth.module.css';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { routes } from '@utils/constants';

const Registration = () => {
	return (
		<div className={styles.container}>
			<h2 className={'text text_type_main-medium mb-6'}>Регистрация</h2>
			<form className={styles.form} onSubmit={(e) => e.preventDefault()}>
				<Input
					type={'text'}
					placeholder={'Имя'}
					value={''}
					onChange={(e) => e.preventDefault()}
				/>
				<EmailInput value={''} onChange={(e) => e.preventDefault()} />
				<PasswordInput value={''} onChange={(e) => e.preventDefault()} />
				<Button type={'primary'} htmlType={'submit'}>
					Зарегистрироваться
				</Button>
			</form>
			<div className={styles.form_footer}>
				<p
					className={`${styles.hint} text text_type_main-default text_color_inactive`}>
					Уже зарегистрированы?{' '}
					<Link
						to={routes.LOGIN}
						className={`${styles.link} text text_color_accent`}>
						Войти
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Registration;
