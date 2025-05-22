import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '@components/modal/modal-overlay/modal-overlay.jsx';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import useModal from '@/hooks/useModal.js';

const modal = document.getElementById('modal');

const Modal = ({ title, children, onClose }) => {
	const { isModalOpen, closeModal, openModal } = useModal();

	const handleCloseModal = useCallback(() => {
		closeModal();
		setTimeout(() => {
			onClose();
		}, 300);
	}, [closeModal, onClose]);

	useEffect(() => {
		openModal();
		const handleEsc = (e) => {
			if (e.key === 'Escape') {
				handleCloseModal();
			}
		};

		document.addEventListener('keydown', handleEsc);
		return () => document.removeEventListener('keydown', handleEsc);
	}, [handleCloseModal, openModal]);

	return createPortal(
		<div className={`${styles.modal} ${isModalOpen ? styles.opened : ''}`}>
			<ModalOverlay onClose={handleCloseModal} />
			<div className={styles.content}>
				<div className={styles.header}>
					<h2 className={'text text_type_main-large'}>{title}</h2>
					<CloseIcon
						type={'primary'}
						onClick={handleCloseModal}
						className={styles.button}
					/>
				</div>
				{children}
			</div>
		</div>,
		modal
	);
};

Modal.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default Modal;
