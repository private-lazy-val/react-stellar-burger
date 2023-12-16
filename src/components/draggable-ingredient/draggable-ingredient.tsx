import {useDrag, useDrop} from 'react-dnd';
import React, {useRef} from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./draggable-ingredient.module.css";
import {useCallback} from "react";
import {removeIngredient} from "../../services/burger-constructor/burger-constructor-slice";
import {useDispatch} from "../../services/store";
import {BaseIngredient} from "../../utils/types";

type DraggableIngredientProps = {
    ingredient: BaseIngredient;
    id: string;
    index: number;
    moveIngredient: (dragIndex: number, hoverIndex: number) => void;
}
const DraggableIngredient = React.memo(({ingredient, id, index, moveIngredient}: DraggableIngredientProps): React.JSX.Element => {
    const dispatch = useDispatch();

    const ref = useRef<HTMLLIElement>(null);

    // The hook returns an array with two items. The first item is an object that contains collected properties.
    // The second item, drop, is a connector function that is used to connect the drop target to the DOM
    const [{handlerId}, drop] = useDrop({
        accept: 'draggable-ingredient',
        // A function that collects certain properties regarding the dragging interaction
        // Monitor is an object that allows pulling certain information about the current drag state
        collect(monitor) {
            return {
                // This retrieves an identifier that will be used to identify this particular drop target in the DnD system
                handlerId: monitor.getHandlerId(),
            }
        },
        // A function that gets triggered when a draggable item hovers over a component
        // item: Contains the data of the currently dragging item that was defined in the useDrag hook’s item function
        // monitor: An object that lets you retrieve information about the current drag state
        hover(item: { index: number }, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine bounding rectangle of the drop target
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            // Calculate the vertical middle of the target
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Retrieve the dragged item's position in the client window
            const clientOffset = monitor.getClientOffset();
            // Calculate the mouse’s vertical position relative to the top of the target
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveIngredient(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{opacity, cursor}, drag] = useDrag({
        type: 'draggable-ingredient',
        item: () => {
            return {id, index};
        },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0 : undefined,
            cursor: monitor.isDragging() ? 'grabbing' : 'grab'
        }),
    });

    drag(drop(ref));

    const removeIngredientFromCart = useCallback((ingredient): void => {
        dispatch(removeIngredient(ingredient));
    }, [dispatch]);

    return (
        <li ref={ref} style={{opacity, cursor}} className={styles['draggable-ingredients']} data-handler-id={handlerId} >
            <DragIcon type="primary"/>
            <ConstructorElement text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                                handleClose={() => {
                                    removeIngredientFromCart(ingredient)
                                }}
            />
        </li>
    );
});

export default DraggableIngredient;