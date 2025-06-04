import React from 'react';
import styles from '@pages/auth/auth.module.css';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
	return (
		<div className={styles.container}>
			<h2 className={'text text_type_main-medium mb-6'}>
				Восстановление пароля
			</h2>
			<form className={styles.form} onSubmit={(e) => e.preventDefault()}>
				<PasswordInput
					value={''}
					onChange={(e) => e.preventDefault()}
					placeholder={'Введите новый пароль'}
				/>
				<Input
					value={''}
					onChange={(e) => e.preventDefault()}
					placeholder={'Введите код из письма'}
				/>
				<Button type={'primary'} htmlType={'submit'}>
					Восстановить
				</Button>
			</form>
			<div className={styles.form_footer}>
				<p
					className={`${styles.hint} text text_type_main-default text_color_inactive`}>
					Вспомнили пароль?{' '}
					<Link
						to={'/login'}
						className={`${styles.link} text text_color_accent`}>
						Войти
					</Link>
				</p>
			</div>
		</div>
	);
};

export default ResetPassword;
