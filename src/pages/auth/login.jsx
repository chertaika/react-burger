import React from 'react';
import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './auth.module.css';
import { routes } from '@utils/constants';

const Login = () => {
	return (
		<div className={styles.container}>
			<h2 className={'text text_type_main-medium'}>Вход</h2>
			<form className={styles.form} onSubmit={(e) => e.preventDefault()}>
				<EmailInput value={''} onChange={(e) => e.preventDefault()} />
				<PasswordInput value={''} onChange={(e) => e.preventDefault()} />
				<Button type={'primary'} htmlType={'submit'}>
					Войти
				</Button>
			</form>
			<div className={styles.form_footer}>
				<p
					className={`${styles.hint} text text_type_main-default text_color_inactive`}>
					Вы — новый пользователь?{' '}
					<Link
						to={routes.REGISTER}
						className={`${styles.link} text text_color_accent`}>
						Зарегистрироваться
					</Link>
				</p>
				<p
					className={`${styles.hint} text text_type_main-default text_color_inactive`}>
					Забыли пароль?{' '}
					<Link
						to={routes.FORGOT_PASSWORD}
						className={`${styles.link} text text_color_accent`}>
						Восстановить пароль
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
