import React, { useEffect } from 'react';
import styles from './auth.module.css';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { EMAIL_REGEX, routes } from '@utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
	clearError,
	getUserError,
	getUserLoading,
	register,
} from '@store/user-slice';
import useFormValidator from '@/hooks/useFormValidator';

const Registration = () => {
	const dispatch = useDispatch();
	const userError = useSelector(getUserError);
	const isLoading = useSelector(getUserLoading);

	const { inputValues, isValid, handleChange, errorMessages } =
		useFormValidator({
			email: '',
			password: '',
			name: '',
		});

	const handleRegister = (e) => {
		e.preventDefault();
		dispatch(register(inputValues));
	};

	useEffect(() => {
		return () => {
			dispatch(clearError());
		};
	}, [dispatch]);

	return (
		<div className={styles.container}>
			<h2 className={'text text_type_main-medium mb-6'}>Регистрация</h2>
			<form className={styles.form} onSubmit={handleRegister}>
				<Input
					type={'text'}
					placeholder={'Имя'}
					onChange={handleChange}
					value={inputValues.name}
					name='name'
					required
					error={errorMessages.name}
					errorText={errorMessages.name}
				/>
				<EmailInput
					name={'email'}
					value={inputValues.email}
					onChange={handleChange}
					required
					pattern={EMAIL_REGEX}
					errorText={errorMessages.email}
				/>
				<PasswordInput
					name={'password'}
					value={inputValues.password}
					onChange={handleChange}
					required
					errorText={errorMessages.password}
					minLength={6}
				/>
				<Button
					type={'primary'}
					htmlType={'submit'}
					disabled={!isValid || isLoading}>
					{isLoading ? (
						<span className={'loading'}>Регистрация...</span>
					) : (
						'Зарегистрироваться'
					)}
				</Button>
				<span
					className={`${styles.error} text text_type_main-default text_color_error`}>
					{userError}
				</span>
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
