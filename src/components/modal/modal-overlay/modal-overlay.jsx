import styles from './modal-overlay.module.css';
import * as PropTypes from 'prop-types';

const ModalOverlay = ({ onClose }) => {
	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
		<div className={styles.overlay} onClick={onClose} />
	);
};

ModalOverlay.propTypes = {
	onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
