import { forwardRef } from 'react';
import styles from './ingredients-group.module.css';

const IngredientsGroup = forwardRef(({ type, items }, ref) => {
	return (
		<article className={styles.ingredients_group} ref={ref}>
			<h2 className={styles.title}>{type}</h2>
			<ul className={styles.ingredients_list}>
				{items.map((item) => (
					<li key={item.id}>
						<img src={item.image} alt={item.title} />
						{item.name}
					</li>
				))}
			</ul>
		</article>
	);
});

export default IngredientsGroup;
