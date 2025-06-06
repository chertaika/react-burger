import styles from './app-header.module.css';
import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { routes } from '@utils/constants';

const AppHeader = () => {
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
				</div>
			</nav>
		</header>
	);
};

export default AppHeader;
