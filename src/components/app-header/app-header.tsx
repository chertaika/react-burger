import styles from './app-header.module.css';
import { JSX } from 'react';
import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { routes } from '@utils/constants';
import { useSelector } from 'react-redux';
// @ts-expect-error: TS7016: Could not find a declaration file for module @store/user-slice
import { getUserInfo } from '@store/user-slice';

const AppHeader = (): JSX.Element => {
	const user = useSelector(getUserInfo);
	return (
		<header className={styles.header}>
			<nav className={`${styles.menu} p-4`}>
				<div className={styles.menu_part_left}>
					<NavLink
						to={routes.HOME}
						className={({ isActive }) =>
							`${styles.link} ${isActive ? styles.link_active : ''}`
						}>
						{({ isActive }) => (
							<>
								<BurgerIcon type={isActive ? 'primary' : 'secondary'} />
								<p className='text text_type_main-default ml-2'>Конструктор</p>
							</>
						)}
					</NavLink>
					<NavLink
						to={routes.FEED}
						className={({ isActive }) =>
							`${styles.link} ${isActive ? styles.link_active : ''}`
						}>
						{({ isActive }) => (
							<>
								<ListIcon type={isActive ? 'primary' : 'secondary'} />
								<p className='text text_type_main-default ml-2'>
									Лента заказов
								</p>
							</>
						)}
					</NavLink>
				</div>
				<div className={styles.logo}>
					<Logo />
				</div>
				<div className={styles.link_position_last}>
					{user ? (
						<NavLink
							to={routes.PROFILE}
							className={({ isActive }) =>
								`${styles.link} ${isActive ? styles.link_active : ''}`
							}>
							{({ isActive }) => (
								<>
									<ProfileIcon type={isActive ? 'primary' : 'secondary'} />
									<p className='text text_type_main-default ml-2'>
										Личный кабинет
									</p>
								</>
							)}
						</NavLink>
					) : (
						<NavLink
							to={routes.LOGIN}
							className={({ isActive }) =>
								`${styles.link} ${isActive ? styles.link_active : ''}`
							}>
							{({ isActive }) => (
								<>
									<ProfileIcon type={isActive ? 'primary' : 'secondary'} />
									<p className='text text_type_main-default ml-2'>
										Вход/Регистрация
									</p>
								</>
							)}
						</NavLink>
					)}
				</div>
			</nav>
		</header>
	);
};

export default AppHeader;
