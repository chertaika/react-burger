import styles from './preloader.module.css';
import { JSX } from 'react';

const Preloader = (): JSX.Element => (
	<div className={styles.preloader}>
		<div className={styles.preloader_circle} />
	</div>
);

export default Preloader;
