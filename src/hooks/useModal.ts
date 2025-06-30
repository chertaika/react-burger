import { useCallback, useState } from 'react';

const useModal = (onClose: () => void) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const openModal = useCallback((): void => {
		setTimeout(() => setIsModalOpen(true), 20);
	}, []);

	const closeModal = useCallback((): void => {
		setIsModalOpen(false);
		setTimeout(onClose, 300);
	}, [onClose]);

	return {
		isModalOpen,
		openModal,
		closeModal,
	};
};

export default useModal;
