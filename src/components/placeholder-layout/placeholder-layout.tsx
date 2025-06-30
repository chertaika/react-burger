import { useStars } from '@/hooks/useStars';
import styles from './placeholder-layout.module.css';
import { JSX, ReactNode } from 'react';

type TPlaceholderLayoutProps = {
	children: ReactNode;
};

const PlaceholderLayout = ({
	children,
}: TPlaceholderLayoutProps): JSX.Element => {
	const stars = useStars(100, 5);

	return (
		<div className={styles.container}>
			{stars}
			<div className={styles.content}>{children}</div>
		</div>
	);
};

export default PlaceholderLayout;
