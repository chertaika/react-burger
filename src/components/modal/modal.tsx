import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '@components/modal/modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, JSX, ReactNode } from 'react';
import useModal from '@hooks/useModal';

const modal = document.getElementById('modal') as HTMLElement;

interface IModalProps {
	title?: string;
	children: ReactNode;
	onClose: () => void;
}

const Modal = ({ title, children, onClose }: IModalProps): JSX.Element => {
	const { isModalOpen, closeModal, openModal } = useModal(onClose);

	useEffect(() => {
		openModal();
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeModal();
			}
		};

		document.addEventListener('keydown', handleEsc);
		return () => document.removeEventListener('keydown', handleEsc);
	}, [closeModal, openModal]);

	return createPortal(
		<div className={`${styles.modal} ${isModalOpen ? styles.opened : ''}`}>
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
