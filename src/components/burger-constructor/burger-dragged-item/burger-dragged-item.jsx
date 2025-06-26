import { useRef } from 'react';
import styles from './burger-dragged-item.module.css';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { moveFilling, removeFilling } from '@store/burger-constructor-slice';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { dragTypes } from '@utils/constants';
import * as PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types';

const BurgerDraggedItem = ({ item, index }) => {
	const dispatch = useDispatch();

	const ref = useRef(null);
	const [{ handlerId }, drop] = useDrop({
		accept: dragTypes.FILLING,
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) {
				return;
			}
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			dispatch(moveFilling({ dragIndex, hoverIndex }));
			item.index = hoverIndex;
		},
	});
	const [{ isDragging }, drag] = useDrag({
		type: dragTypes.FILLING,
		item: () => {
			return { index };
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	drag(drop(ref));

	const handleRemoveFilling = (uid) => {
		dispatch(removeFilling(uid));
	};

	return (
		<article
			className={`${styles.ingredient} ${isDragging ? styles.draggable : ''}`}
			key={item.uid}
			data-handler-id={handlerId}
			ref={ref}>
			<DragIcon type='primary' />
			<ConstructorElement
				text={item.name}
				price={item.price}
				thumbnail={item.image}
				handleClose={() => handleRemoveFilling(item.uid)}
			/>
		</article>
	);
};

BurgerDraggedItem.propTypes = {
	index: PropTypes.number.isRequired,
	item: ingredientPropType.isRequired,
};

export default BurgerDraggedItem;
