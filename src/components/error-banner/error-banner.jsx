import styles from './error-banner.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import * as PropTypes from 'prop-types';

const ErrorBanner = ({ text, clearError }) => {
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

ErrorBanner.propTypes = {
	text: PropTypes.string.isRequired,
	clearError: PropTypes.func,
};

export default ErrorBanner;
