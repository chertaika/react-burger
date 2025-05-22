import styles from './modal-overlay.module.css';
import * as PropTypes from 'prop-types';

const ModalOverlay = ({ onClose }) => {
	return (
		<button
			className={styles.overlay}
			onClick={onClose}
			aria-label='Закрыть модальное окно'
		/>
	);
};

ModalOverlay.propTypes = {
	onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
