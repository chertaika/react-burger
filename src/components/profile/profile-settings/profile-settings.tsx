import { FormEvent, useEffect, useRef, useState } from 'react';
import styles from './profile-settings.module.css';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import useFormValidator from '@/hooks/useFormValidator';
import { useDispatch, useSelector } from 'react-redux';
import {
	changeUserInfo,
	clearError,
	getLoadingStatus,
	getUserError,
	getUserInfo,
	// @ts-expect-error: TS7016: Could not find a declaration file for module @store/user-slice
} from '@store/user-slice';
import { TUser, TUserLoadingStates, TUserWithPassword } from '@utils/types';

const ProfileSettings = () => {
	const dispatch = useDispatch();
	const user: TUser = useSelector(getUserInfo);
	const userError: string = useSelector(getUserError);
	const { changeUserInfo: isLoading }: TUserLoadingStates =
		useSelector(getLoadingStatus);
	const { inputValues, isValid, handleChange, errorMessages, resetForm } =
		useFormValidator<TUserWithPassword>({
			...user,
			password: '',
		});

	const nameInputRef = useRef<HTMLInputElement>(null);
	const [isDisabledNameInput, setIsDisabledNameInput] = useState(true);

	const isValuesChanged =
		(Object.keys(user) as Array<keyof TUser>).some(
			(key) => user[key] !== inputValues[key]
		) || inputValues.password.length > 0;

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
