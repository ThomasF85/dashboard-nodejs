import {
    executeAddWidget,
    executeDeleteWidget,
    executeEditWidget,
    executeRepositionWidget,
    executeResizeWidget,
    INITIAL_STATE,
} from './dashboard.utils';
import { DashboardAction, DashboardState } from './type';
import { DashboardActionTypes } from './dashboard.types';
import { DashboardMode } from '../common/dashboard-mode';

const dashboardReducer = (state = INITIAL_STATE, action: DashboardAction): DashboardState => {
    switch (action.type) {
        case DashboardActionTypes.ENTER_EDIT_MODE:
            return {
                ...state,
                latestUneditedWidgets: state.widgets,
                mode: DashboardMode.EDIT,
            };
        case DashboardActionTypes.CANCEL_EDIT_MODE:
            return {
                ...state,
                widgets: state.latestUneditedWidgets,
                mode: DashboardMode.READ,
            };
        case DashboardActionTypes.RESIZE_WIDGET:
            return {
                ...state,
                widgets: executeResizeWidget(
                    state.widgets,
                    action.payload.widgetId,
                    action.payload.newWidth,
                    action.payload.newHeight,
                ),
            };
        case DashboardActionTypes.REPOSITION_WIDGET:
            return {
                ...state,
                widgets: executeRepositionWidget(
                    state.widgets,
                    action.payload.widgetId,
                    action.payload.newX,
                    action.payload.newY,
                ),
            };
        case DashboardActionTypes.ADD_WIDGET:
            return {
                ...state,
                widgets: executeAddWidget(state.widgets, action.payload.widgetType, action.payload.widgetConfig),
                addWidgetModalShown: false,
            };
        case DashboardActionTypes.DELETE_WIDGET:
            return {
                ...state,
                widgets: executeDeleteWidget(state.widgets, action.payload.id),
            };
        case DashboardActionTypes.EDIT_WIDGET:
            return {
                ...state,
                widgets: executeEditWidget(state.widgets, action.payload.id, action.payload.config),
                editWidgetModal: {
                    ...state.editWidgetModal,
                    shown: false,
                },
            };
        case DashboardActionTypes.SHOW_ADD_WIDGET_MODAL:
            return {
                ...state,
                addWidgetModalShown: true,
            };
        case DashboardActionTypes.CANCEL_ADD_WIDGET_MODAL:
            return {
                ...state,
                addWidgetModalShown: false,
            };
        case DashboardActionTypes.SHOW_EDIT_WIDGET_MODAL:
            return {
                ...state,
                editWidgetModal: {
                    shown: true,
                    id: action.payload.id,
                    type: action.payload.type,
                },
            };
        case DashboardActionTypes.CANCEL_EDIT_WIDGET_MODAL:
            return {
                ...state,
                editWidgetModal: {
                    ...state.editWidgetModal,
                    shown: false,
                },
            };
        case DashboardActionTypes.APPLY_LOADED_WIDGETS:
            return {
                ...state,
                widgets: action.payload.widgets,
                loading: false,
            };
        case DashboardActionTypes.ENTER_LOADING_STATE:
            return {
                ...state,
                loading: true,
            };
        case DashboardActionTypes.EXIT_LOADING_STATE:
            return {
                ...state,
                loading: false,
            };
        case DashboardActionTypes.EXIT_LOADING_AND_EDIT_STATE:
            return {
                ...state,
                loading: false,
                mode: DashboardMode.READ,
            };
        default:
            return state;
    }
};

export default dashboardReducer;
