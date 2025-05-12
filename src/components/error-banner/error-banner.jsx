import styles from './error-banner.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const ErrorBanner = ({ text, clearError }) => {
	return (
		<article className={styles.banner}>
			<span className={`${styles.text} text text_type_main-small`}>{text}</span>
			<CloseIcon
				type='primary'
				onClick={clearError}
				className={styles.button}
			/>
		</article>
	);
};

export default ErrorBanner;
