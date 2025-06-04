import React from 'react';
import styles from './profile-settings.module.css';
import {
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

const ProfileSettings = () => {
	return (
		<form className={styles.container} onSubmit={(e) => e.preventDefault()}>
			<Input
				name='name'
				placeholder={'Имя'}
				icon={'EditIcon'}
				value={'Екатерина'}
				onChange={(e) => e.preventDefault()}
			/>
			<EmailInput
				value={'222@222.ru'}
				onChange={(e) => e.preventDefault()}
				placeholder={'Логин'}
				icon={'EditIcon'}
			/>
			<PasswordInput
				value={'22222222'}
				onChange={(e) => e.preventDefault()}
				icon={'EditIcon'}
			/>
		</form>
	);
};

export default ProfileSettings;
