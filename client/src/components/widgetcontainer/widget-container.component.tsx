import React, { useState } from 'react';
import './widget-container.styles.css';
import { Rnd, RndDragCallback, RndResizeCallback, RndResizeStartCallback } from 'react-rnd';
import { DashboardAction, PositionAndSize, TWidget } from '../../redux/type';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { deleteWidget, repositionWidget, resizeWidget, showEditWidgetModal } from '../../redux/dashboard.actions';
import { FaCog, FaWindowClose } from 'react-icons/all';
import { Widget } from '../widget/widgets';
import { TInnerWidget } from '../widget/widget.types';

const extractNumberFromPXString: (px: string) => number = (px: string) => {
    const cleanedString: string = px.replace('px', '');
    return parseInt(cleanedString);
};

const extractPositionXFromTransform: (transform: string) => number = (transform: string) => {
    return parseInt(transform.substring(10, transform.indexOf('px'))) + 1;
};

const extractPositionYFromTransform: (transform: string) => number = (transform: string) => {
    return parseInt(transform.substring(transform.indexOf('px') + 4, transform.indexOf('px)'))) + 1;
};

const transformToTInnerWidget = <T,>(positionAndSize: PositionAndSize, config: T): TInnerWidget<T> => {
    return {
        config,
        width: positionAndSize.width - 10,
        height: positionAndSize.height - 35,
    };
};
const iconStyle = { marginRight: '5px', marginTop: '3px', cursor: 'pointer' };

const WidgetContainer = <T,>(props: WidgetContainerProps<T>) => {
    const { editable } = props;
    const { id, positionAndSize, type, config }: TWidget<T> = props.widget;
    const dispatch: Dispatch<DashboardAction> = useDispatch();
    const [resizing, setResizing] = useState(false);

    const resizeStartHandler: RndResizeStartCallback = () => {
        setResizing(true);
    };
    const resizeStopHandler: RndResizeCallback = (e, dir, ref) => {
        dispatch(
            resizeWidget(id, extractNumberFromPXString(ref.style.width), extractNumberFromPXString(ref.style.height)),
        );
        setResizing(false);
    };
    const dragStopHandler: RndDragCallback = (e, data) => {
        const x = extractPositionXFromTransform(data.node.style.transform);
        const y = extractPositionYFromTransform(data.node.style.transform);
        dispatch(repositionWidget(id, x, y));
    };
    const innerWidgetProps: TInnerWidget<T> = transformToTInnerWidget(positionAndSize, config);

    return (
        <Rnd
            position={{ x: positionAndSize.x, y: positionAndSize.y }}
            size={{ width: positionAndSize.width, height: positionAndSize.height }}
            resizeGrid={[50, 50]}
            dragGrid={[50, 50]}
            className="widget-container"
            minWidth="150"
            minHeight="100"
            maxWidth="400"
            maxHeight="250"
            bounds="parent"
            enableResizing={editable}
            disableDragging={!editable}
            onResizeStart={resizeStartHandler}
            onResizeStop={resizeStopHandler}
            onDragStop={dragStopHandler}
        >
            <div className={resizing ? 'transparent' : ''}>
                {editable ? (
                    <div className="float-end">
                        <FaCog
                            style={iconStyle}
                            onClick={() => dispatch(showEditWidgetModal(type, id))}
                            size={25}
                            color="rgba(0,0,0,0.3)"
                        />
                        <FaWindowClose
                            style={iconStyle}
                            onClick={() => dispatch(deleteWidget(id))}
                            size={25}
                            color="rgba(0,0,0,0.3)"
                        />
                    </div>
                ) : null}
                <div className="widget-offset">
                    <Widget widgetType={type} {...innerWidgetProps} />
                </div>
            </div>
        </Rnd>
    );
};

type WidgetContainerProps<T> = {
    widget: TWidget<T>;
    editable: boolean;
};

export default React.memo(WidgetContainer);
