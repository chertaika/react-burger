import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '@components/modal/modal-overlay/modal-overlay.jsx';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useEffect, useState } from 'react';

const modal = document.getElementById('modal');

const Modal = ({ title, children, onClose }) => {
	const [isVisible, setIsVisible] = useState(false);

	const closeModal = useCallback(() => {
		setIsVisible(false);
		setTimeout(() => {
			onClose();
		}, 300);
	}, [onClose]);

	useEffect(() => {
		setIsVisible(true);
		const handleEsc = (e) => {
			if (e.key === 'Escape') {
				closeModal();
			}
		};

		document.addEventListener('keydown', handleEsc);
		return () => document.removeEventListener('keydown', handleEsc);
	}, [closeModal]);

	return createPortal(
		<div className={`${styles.modal} ${isVisible ? styles.opened : ''}`}>
			<ModalOverlay onClose={closeModal} />
			<div className={styles.content}>
				<div className={styles.header}>
					<h2 className={'text text_type_main-large'}>{title}</h2>
					<CloseIcon
						type={'primary'}
						onClick={closeModal}
						className={styles.button}
					/>
				</div>
				{children}
			</div>
		</div>,
		modal
	);
};

export default Modal;
