import React, { useCallback, useState } from 'react';
import { Button, Form, Modal, Row } from 'react-bootstrap';
import { Dispatch } from 'redux';
import { DashboardAction } from '../../redux/type';
import { useDispatch, useSelector } from 'react-redux';
import { addWidget, cancelAddWidgetModal } from '../../redux/dashboard.actions';
import { selectIsAddWidgetModalShown } from '../../redux/dashboard.selectors';
import { WidgetEditor, defaultConfig } from '../widget/widgets';
import { WidgetType } from '../../common/wiget-type';

const AddWidgetModal: React.FC = () => {
    const [radioValue, setRadioValue] = useState(WidgetType.BAR_CHART);
    const [widgetConfig, setWidgetConfig] = useState(defaultConfig(WidgetType.BAR_CHART));
    const dispatch: Dispatch<DashboardAction> = useDispatch();
    const show: boolean = useSelector(selectIsAddWidgetModalShown);

    const addWidgetCB: () => any = useCallback(
        () => dispatch(addWidget(radioValue, widgetConfig)),
        [dispatch, radioValue, widgetConfig],
    );
    const cancelCB: () => any = useCallback(() => dispatch(cancelAddWidgetModal()), [dispatch]);
    const radioValueChange: (widgetType: WidgetType) => any = (widgetType: WidgetType) => {
        setWidgetConfig(defaultConfig(widgetType));
        setRadioValue(widgetType);
    };

    return (
        <Modal show={show} onHide={cancelCB}>
            <Modal.Header closeButton>
                <Modal.Title>Add Widget</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail2">
                        {Object.keys(WidgetType).map((widgetType) => (
                            <div key={widgetType} className="mb-3">
                                <Form.Check
                                    checked={widgetType === radioValue}
                                    type="radio"
                                    name="widgetTypeRadioGroup"
                                    id={widgetType}
                                    label={widgetType}
                                    onChange={() => radioValueChange(widgetType as WidgetType)}
                                />
                            </div>
                        ))}
                    </Form.Group>
                    <WidgetEditor
                        widgetType={radioValue}
                        widgetConfig={widgetConfig}
                        setWidgetConfig={setWidgetConfig}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={cancelCB}>
                    Cancel
                </Button>
                <Button variant="outline-primary" onClick={addWidgetCB}>
                    Add widget
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default React.memo(AddWidgetModal);
