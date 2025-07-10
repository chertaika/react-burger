import { FormEvent, useEffect, useRef, useState } from 'react';
import styles from './profile-settings.module.css';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import useFormValidator from '@/hooks/useFormValidator';
import {
	changeUserInfo,
	clearError,
	getLoadingStatus,
	getUserError,
	getUserInfo,
} from '@store/user-slice';
import { TUser, TUserLoadingStates, TUserWithPassword } from '@utils/types';
import { useAppDispatch, useAppSelector } from '@store/hooks';

const ProfileSettings = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(getUserInfo);
	const userError = useAppSelector(getUserError);
	const { changeUserInfo: isLoading }: TUserLoadingStates =
		useAppSelector(getLoadingStatus);
	const { inputValues, isValid, handleChange, errorMessages, resetForm } =
		useFormValidator<TUserWithPassword>(
			user ? { ...user, password: '' } : { email: '', name: '', password: '' }
		);

	const nameInputRef = useRef<HTMLInputElement>(null);
	const [isDisabledNameInput, setIsDisabledNameInput] = useState<boolean>(true);

	const isValuesChanged = user
		? (Object.keys(user) as Array<keyof TUser>).some(
				(key) => user[key] !== inputValues[key]
			) || inputValues.password.length > 0
		: Object.values(inputValues).some((value) => value.length > 0);

	const handleEditIconClick = () => {
		setIsDisabledNameInput(false);
		setTimeout(() => nameInputRef.current?.focus(), 0);
	};

	const handleSaveUserInfo = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(changeUserInfo(inputValues));
	};

	useEffect(() => {
		return () => {
			dispatch(clearError());
		};
	}, [dispatch]);

	return (
		<form className={styles.container} onSubmit={handleSaveUserInfo}>
			<Input
				name='name'
				placeholder={'Имя'}
				icon={'EditIcon'}
				onIconClick={handleEditIconClick}
				value={inputValues.name ?? ''}
				onChange={handleChange}
				error={!!errorMessages?.name && errorMessages?.name?.length > 0}
				errorText={errorMessages.name}
				ref={nameInputRef}
				disabled={isDisabledNameInput}
				onBlur={() => setIsDisabledNameInput(true)}
				required
				checked
				autoComplete={'nickname'}
			/>
			<EmailInput
				name={'email'}
				value={inputValues.email}
				onChange={handleChange}
				placeholder={'Логин'}
				errorText={errorMessages.email}
				isIcon
				required
				autoComplete={'email'}
			/>
			<PasswordInput
				name={'password'}
				value={inputValues.password}
				onChange={handleChange}
				icon={'EditIcon'}
				minLength={6}
				errorText={errorMessages.password}
				autoComplete={'new-password'}
			/>

			{isValuesChanged && (
				<div className={styles.actions}>
					<Button
						htmlType='button'
						onClick={resetForm}
						type='secondary'
						size='medium'
						extraClass={'pl-2 pr-2'}>
						Отмена
					</Button>
					<Button htmlType={'submit'} disabled={!isValid || isLoading}>
						{isLoading ? (
							<span className={'loading'}>Сохранение...</span>
						) : (
							'Сохранить'
						)}
					</Button>
				</div>
			)}
			<span className={'text text_type_main-default text_color_error'}>
				{userError}
			</span>
		</form>
	);
};

export default ProfileSettings;
