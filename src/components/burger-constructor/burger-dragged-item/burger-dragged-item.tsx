import { JSX, useRef } from 'react';
import styles from './burger-dragged-item.module.css';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
// @ts-expect-error: TS7016: Could not find a declaration file for module @store/burger-constructor-slice
import { moveFilling, removeFilling } from '@store/burger-constructor-slice';
import { useDispatch } from 'react-redux';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import type { Identifier } from 'dnd-core';
import { dragTypes } from '@utils/constants';
import { TDraggedIngredient } from '@utils/types';

type TBurgerDraggedItemProps = {
	item: TDraggedIngredient;
	index: number;
};

type DragItem = {
	index: number;
};

const BurgerDraggedItem = ({
	item,
	index,
}: TBurgerDraggedItemProps): JSX.Element => {
	const dispatch = useDispatch();

	const ref = useRef<HTMLElement>(null);
	const [{ handlerId }, drop] = useDrop<
		DragItem,
		void,
		{ handlerId: Identifier | null }
	>({
		accept: dragTypes.FILLING,
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item: DragItem, monitor: DropTargetMonitor) {
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
			if (!clientOffset) return;

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

	const handleRemoveFilling = (uid: string) => {
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

export default BurgerDraggedItem;
