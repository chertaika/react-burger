import styles from './modal-overlay.module.css';

interface IModalProps {
	onClose: () => void;
}

const ModalOverlay = ({ onClose }: IModalProps) => {
	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
		<div
			className={styles.overlay}
			onClick={onClose}
			aria-label='Закрыть модальное окно'
		/>
	);
};

export default ModalOverlay;
