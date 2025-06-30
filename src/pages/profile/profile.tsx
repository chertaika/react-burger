import styles from './profile.module.css';
import { NavLink, Outlet } from 'react-router-dom';
import { routes } from '@utils/constants';
import { useDispatch, useSelector } from 'react-redux';
// @ts-expect-error: TS7016: Could not find a declaration file for module @store/user-slice
import { getLoadingStatus, logout } from '@store/user-slice';
import { TUserLoadingStates } from '@utils/types';
import { JSX } from 'react';

const Profile = (): JSX.Element => {
	const dispatch = useDispatch();
	const { logout: isLoading }: TUserLoadingStates =
		useSelector(getLoadingStatus);

	const handleLogout = (): void => {
		dispatch(logout());
	};
	return (
		<div className={styles.container}>
			<nav className={styles.nav}>
				<ul>
					<li>
						<NavLink
							to={routes.PROFILE}
							end
							className={({ isActive }) =>
								`${styles.nav_link} text text_type_main-medium text_color_inactive ${isActive ? styles.active : ''}`
							}>
							Профиль
						</NavLink>
					</li>
					<li>
						<NavLink
							to={routes.PROFILE_ORDERS}
							className={({ isActive }) =>
								`${styles.nav_link} text text_type_main-medium text_color_inactive ${isActive ? styles.active : ''}`
							}>
							История заказов
						</NavLink>
					</li>
					<li>
						<button
							className={`${styles.nav_link} text text_type_main-medium text_color_inactive`}
							onClick={handleLogout}>
							{isLoading ? (
								<span className={'loading'}>Выход...</span>
							) : (
								'Выход'
							)}
						</button>
					</li>
					<p
						className={`${styles.hint} text text_type_main-default text_color_inactive mt-20`}>
						В этом разделе вы можете изменить&nbsp;свои персональные данные
					</p>
				</ul>
			</nav>
			<Outlet />
		</div>
	);
};

export default Profile;
