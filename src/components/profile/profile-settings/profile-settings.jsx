import React, { useEffect, useRef, useState } from 'react';
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
} from '@store/user-slice';

const ProfileSettings = () => {
	const dispatch = useDispatch();
	const user = useSelector(getUserInfo);
	const userError = useSelector(getUserError);
	const { changeUserInfo: isLoading } = useSelector(getLoadingStatus);
	const { inputValues, isValid, handleChange, errorMessages, resetForm } =
		useFormValidator({
			...user,
			password: '',
		});

	const nameInputRef = useRef(null);
	const [isDisabledNameInput, setIsDisabledNameInput] = useState(true);

	const isValuesChanged =
		Object.keys(user).some((key) => user[key] !== inputValues[key]) ||
		inputValues.password.length > 0;

	const handleEditIconClick = () => {
		setIsDisabledNameInput(false);
		setTimeout(() => nameInputRef.current.focus(), 0);
	};

	const handleSaveUserInfo = (e) => {
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
				value={inputValues.name}
				onChange={handleChange}
				error={errorMessages?.name?.length > 0}
				errorText={errorMessages.name}
				ref={nameInputRef}
				disabled={isDisabledNameInput}
				onBlur={() => setIsDisabledNameInput(true)}
				required
				checked
			/>
			<EmailInput
				name={'email'}
				value={inputValues.email}
				onChange={handleChange}
				placeholder={'Логин'}
				errorText={errorMessages.email}
				isIcon
				required
			/>
			<PasswordInput
				name={'password'}
				value={inputValues.password}
				onChange={handleChange}
				icon={'EditIcon'}
				minLength={6}
				errorText={errorMessages.password}
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
