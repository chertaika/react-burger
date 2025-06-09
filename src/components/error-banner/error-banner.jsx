import styles from './error-banner.module.css';
import * as PropTypes from 'prop-types';
import { useEffect } from 'react';

const ErrorBanner = ({ text, clearError }) => {
	useEffect(() => {
		if (!clearError) return;

		let timer = setTimeout(() => {
			timer = null;
			clearError();
		}, 5000);

		return () => {
			if (timer !== null) {
				clearTimeout(timer);
				clearError();
			}
		};
	}, [clearError]);

	return (
		<article className={styles.banner}>
			<span className={`${styles.text} text text_type_main-small`}>{text}</span>
		</article>
	);
};

ErrorBanner.propTypes = {
	text: PropTypes.string.isRequired,
	clearError: PropTypes.func,
};

export default ErrorBanner;
