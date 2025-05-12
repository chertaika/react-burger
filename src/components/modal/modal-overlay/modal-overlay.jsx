import styles from './modal-overlay.module.css';

const ModalOverlay = ({ onClose }) => {
	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
		<div className={styles.overlay} onClick={onClose} />
	);
};

export default ModalOverlay;
