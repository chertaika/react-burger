import { useMemo } from 'react';

export const useStars = (count = 50, maxSize = 5) => {
	return useMemo(() => {
		return Array.from({ length: count }, (_, i) => {
			const size = `${Math.random() * maxSize}px`;
			return (
				<div
					key={i}
					style={{
						width: size,
						height: size,
						left: `${Math.random() * 100}%`,
						top: `${Math.random() * 100}%`,
						position: 'absolute',
						background: 'var(--text-primary-color)',
						borderRadius: '50%',
						animation: 'twinkle 2s infinite',
						animationDelay: `${Math.random() * 2}s`,
					}}
				/>
			);
		});
	}, [count, maxSize]);
};
