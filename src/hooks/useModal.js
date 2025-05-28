import { useCallback, useState } from 'react';

const useModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = useCallback(() => {
		setTimeout(() => setIsModalOpen(true), 20);
	}, []);

	const closeModal = useCallback(() => {
		setIsModalOpen(false);
	}, []);

	return {
		isModalOpen,
		openModal,
		closeModal,
	};
};

export default useModal;
