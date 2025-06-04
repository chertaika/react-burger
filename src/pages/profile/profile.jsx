import React from 'react';
import styles from './profile.module.css';
import { NavLink, Outlet } from 'react-router-dom';

const Profile = () => {
	return (
		<div className={styles.container}>
			<nav className={styles.nav}>
				<ul>
					<li>
						<NavLink
							to={'/profile'}
							end
							className={({ isActive }) =>
								`${styles.nav_link} text text_type_main-medium text_color_inactive ${isActive ? styles.active : ''}`
							}>
							Профиль
						</NavLink>
					</li>
					<li>
						<NavLink
							to={'/profile/orders'}
							className={({ isActive }) =>
								`${styles.nav_link} text text_type_main-medium text_color_inactive ${isActive ? styles.active : ''}`
							}>
							История заказов
						</NavLink>
					</li>
					<li
						className={`${styles.nav_link} text text_type_main-medium text_color_inactive`}>
						Выход
					</li>
				</ul>
			</nav>
			<Outlet />
		</div>
	);
};

export default Profile;
