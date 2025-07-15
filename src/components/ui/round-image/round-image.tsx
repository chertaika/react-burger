import styles from './round-image.module.css';
import { JSX } from 'react';

type TRoundImageProps = {
	src: string;
	alt: string;
};

const RoundImage = ({ src, alt }: TRoundImageProps): JSX.Element => {
	return (
		<div className={styles.container}>
			<img src={src} alt={alt} />
		</div>
	);
};

export default RoundImage;
