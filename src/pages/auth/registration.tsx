import { useEffect, JSX, FormEvent } from 'react';
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
	getLoadingStatus,
	getUserError,
	register,
	// @ts-expect-error: TS7016: Could not find a declaration file for module @store/user-slice
} from '@store/user-slice';
import useFormValidator from '@/hooks/useFormValidator';
import { TUserLoadingStates, TUserWithPassword } from '@utils/types';

const Registration = (): JSX.Element => {
	const dispatch = useDispatch();
	const userError: string = useSelector(getUserError);
	const { register: isLoading }: TUserLoadingStates =
		useSelector(getLoadingStatus);

	const { inputValues, isValid, handleChange, errorMessages } =
		useFormValidator<TUserWithPassword>({
			email: '',
			password: '',
			name: '',
		});

	const handleRegister = (e: FormEvent<HTMLFormElement>) => {
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
					value={inputValues.name ?? ''}
					name='name'
					required
					error={!!errorMessages?.name && errorMessages?.name?.length > 0}
					errorText={errorMessages.name}
					autoComplete={'nickname'}
				/>
				<EmailInput
					name={'email'}
					value={inputValues.email ?? ''}
					onChange={handleChange}
					required
					pattern={EMAIL_REGEX}
					errorText={errorMessages.email}
					autoComplete={'email'}
				/>
				<PasswordInput
					name={'password'}
					value={inputValues.password || ''}
					onChange={handleChange}
					required
					errorText={errorMessages.password}
					minLength={6}
					autoComplete={'new-password'}
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
