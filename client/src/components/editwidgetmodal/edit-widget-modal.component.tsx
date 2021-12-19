import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Dispatch } from 'redux';
import { DashboardAction, TWidget } from '../../redux/type';
import { useDispatch, useSelector } from 'react-redux';
import { cancelEditWidgetModal, editWidget } from '../../redux/dashboard.actions';
import { selectIsEditWidgetModalShown } from '../../redux/dashboard.selectors';
import { WidgetEditor } from '../widget/widgets';

const EditWidgetModal: React.FC<EditWidgetModalProps> = (props: EditWidgetModalProps) => {
    const widgetToEdit: TWidget<any> = props.widget;
    const [widgetConfig, setWidgetConfig] = useState(widgetToEdit.config);
    const dispatch: Dispatch<DashboardAction> = useDispatch();
    const show: boolean = useSelector(selectIsEditWidgetModalShown);

    useEffect(() => setWidgetConfig(widgetToEdit.config), [widgetToEdit]);

    const editWidgetCB: () => any = useCallback(
        () => dispatch(editWidget(widgetToEdit.id, widgetConfig)),
        [dispatch, widgetToEdit, widgetConfig],
    );
    const cancelCB: () => any = useCallback(() => dispatch(cancelEditWidgetModal()), [dispatch]);

    return (
        <Modal show={show} onHide={cancelCB}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Widget</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <WidgetEditor
                        widgetType={widgetToEdit.type}
                        widgetConfig={widgetConfig}
                        setWidgetConfig={setWidgetConfig}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={cancelCB}>
                    Cancel
                </Button>
                <Button variant="outline-primary" onClick={editWidgetCB}>
                    Save changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

type EditWidgetModalProps = {
    widget: TWidget<any>;
};

export default EditWidgetModal;
