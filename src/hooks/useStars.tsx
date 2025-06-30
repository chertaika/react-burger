import { JSX, useMemo } from 'react';

export const useStars = (
	count: number = 50,
	maxSize: number = 5
): Array<JSX.Element> => {
	return useMemo(() => {
		return Array.from({ length: count }, (_, i): JSX.Element => {
			const size = `${Math.random() * maxSize}px`;
			return (
				<div
					key={i}
					style={{
						width: size,
						height: size,
						left: `${Math.random() * 99}%`,
						top: `${Math.random() * 99}%`,
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
