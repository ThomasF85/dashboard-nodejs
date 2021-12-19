import React, { useCallback, useEffect } from 'react';
import './dashboard.styles.scss';
import WidgetContainer from '../widgetcontainer/widget-container.component';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { selectIsEditMode, selectIsLoading, selectWidgets } from '../../redux/dashboard.selectors';
import { Button, Spinner } from 'react-bootstrap';
import AddWidgetModal from '../addwidgetmodal/add-widget-modal.component';
import { Dispatch } from 'redux';
import { DashboardAction, TWidget } from '../../redux/type';
import {
    applyLoadedWidgets,
    cancelEditMode,
    enterEditMode,
    enterLoadingState,
    exitLoadingAndEditState,
    exitLoadingState,
    showAddWidgetModal as showAddModal,
} from '../../redux/dashboard.actions';
import EditWidgetModalContainer from '../editwidgetmodal/edit-widget-modal-container.component';
import { getWidgets, saveWidgets } from '../../api/api';

const Dashboard: React.FC = () => {
    const widgets: TWidget<any>[] = useSelector(selectWidgets, shallowEqual);
    const editMode: boolean = useSelector(selectIsEditMode, shallowEqual);
    const isLoading: boolean = useSelector(selectIsLoading, shallowEqual);
    const dispatch: Dispatch<DashboardAction> = useDispatch();

    const enterEditModeCB: () => any = useCallback(() => dispatch(enterEditMode()), [dispatch]);
    const cancelEditModeCB: () => any = useCallback(() => dispatch(cancelEditMode()), [dispatch]);

    const saveCB: () => any = useCallback(() => {
        dispatch(enterLoadingState());
        saveWidgets(
            widgets,
            () => dispatch(exitLoadingAndEditState()),
            (err: any) => {
                console.error(err);
                dispatch(exitLoadingState());
            },
        );
    }, [dispatch, widgets]);

    const showAddWidgetModal = () => dispatch(showAddModal());

    useEffect(() => {
        getWidgets(
            (widgetsFromServer: TWidget<any>[]) => dispatch(applyLoadedWidgets(widgetsFromServer)),
            (err: any) => {
                console.error(err);
                dispatch(exitLoadingState());
            },
        );
    }, []);

    const buttonGroupEdit = (
        <div className="float-end">
            <Button disabled={isLoading} variant="outline-primary" onClick={showAddWidgetModal}>
                Add widget
            </Button>
            <Button disabled={isLoading} className="button-spacing" variant="outline-primary" onClick={saveCB}>
                Save
            </Button>
            <Button
                disabled={isLoading}
                className="button-spacing"
                variant="outline-primary"
                onClick={cancelEditModeCB}
            >
                Cancel
            </Button>
        </div>
    );
    const buttonGroupWatch = (
        <div className="float-end">
            <Button disabled={isLoading} variant="outline-primary" onClick={enterEditModeCB}>
                edit
            </Button>
        </div>
    );

    return (
        <div className="dashboard-background">
            <div className="row button-bar">
                <div className="col-md">{editMode ? buttonGroupEdit : buttonGroupWatch}</div>
            </div>
            <div className="dashboard">
                {widgets.map((widget) => (
                    <WidgetContainer key={widget.id} widget={widget} editable={editMode} />
                ))}
            </div>
            {isLoading ? (
                <div className="blocking">
                    <Spinner className="spinner" animation="border" role="status" />
                    <span className="sr-only spinner"> Loading...</span>
                </div>
            ) : null}
            <AddWidgetModal />
            <EditWidgetModalContainer />
        </div>
    );
};

export default Dashboard;
