import React from 'react';
import styles from './profile.module.css';
import { NavLink, Outlet } from 'react-router-dom';
import { routes } from '@utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLoading, logout } from '@store/user-slice';

const Profile = () => {
	const dispatch = useDispatch();
	const isLoading = useSelector(getUserLoading);

	const handleLogout = () => {
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
				</ul>
			</nav>
			<Outlet />
		</div>
	);
};

export default Profile;
