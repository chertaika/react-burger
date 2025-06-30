import styles from './error-banner.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { JSX } from 'react';

type ErrorBannerProps = {
	text: string;
	clearError?: () => void;
};

const ErrorBanner = ({ text, clearError }: ErrorBannerProps): JSX.Element => {
	return (
		<article className={styles.banner}>
			<span className={`${styles.text} text text_type_main-small`}>{text}</span>
			{clearError && (
				<CloseIcon
					type='primary'
					onClick={clearError}
					className={styles.button}
				/>
			)}
		</article>
	);
};

export default ErrorBanner;
