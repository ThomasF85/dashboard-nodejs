import React from 'react';
import { TWidget } from '../../redux/type';
import { useSelector } from 'react-redux';
import { selectWidgetToEdit } from '../../redux/dashboard.selectors';
import EditWidgetModal from './edit-widget-modal.component';

const EditWidgetModalContainer: React.FC = () => {
    const widgetToEdit: TWidget<any> = useSelector(selectWidgetToEdit);
    return widgetToEdit ? <EditWidgetModal widget={widgetToEdit} /> : null;
};

export default React.memo(EditWidgetModalContainer);
