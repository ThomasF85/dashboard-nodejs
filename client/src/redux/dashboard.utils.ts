import { DashboardState, TWidget } from './type';
import { DashboardMode } from '../common/dashboard-mode';
import { WidgetType } from '../common/wiget-type';

export const INITIAL_STATE: DashboardState = {
    widgets: [],
    latestUneditedWidgets: [],
    mode: DashboardMode.READ,
    addWidgetModalShown: false,
    editWidgetModal: { shown: false, type: WidgetType.BAR_CHART, id: '' },
    loading: true,
};

export const executeResizeWidget = (
    widgets: TWidget<any>[],
    widgetId: string,
    newWidth: number,
    newHeight: number,
): TWidget<any>[] => {
    const widgetToResize: TWidget<any> = widgets.filter((widget) => widget.id === widgetId)[0];
    if (!widgetToResize) {
        return widgets;
    }
    return widgets.map((widget) =>
        widget === widgetToResize
            ? {
                  ...widgetToResize,
                  positionAndSize: {
                      ...widgetToResize.positionAndSize,
                      width: newWidth,
                      height: newHeight,
                  },
              }
            : widget,
    );
};

export const executeRepositionWidget = (
    widgets: TWidget<any>[],
    widgetId: string,
    newX: number,
    newY: number,
): TWidget<any>[] => {
    const widgetToReposition: TWidget<any> = widgets.filter((widget) => widget.id === widgetId)[0];
    if (!widgetToReposition) {
        return widgets;
    }
    return widgets.map((widget) =>
        widget === widgetToReposition
            ? {
                  ...widgetToReposition,
                  positionAndSize: {
                      ...widgetToReposition.positionAndSize,
                      x: newX,
                      y: newY,
                  },
              }
            : widget,
    );
};

export const executeAddWidget = <T>(
    widgets: TWidget<any>[],
    widgetType: WidgetType,
    widgetConfig: T,
): TWidget<any>[] => {
    const newWidget: TWidget<T> = {
        id: Math.random().toString(36).substring(2),
        type: widgetType,
        positionAndSize: {
            x: 50,
            y: 50,
            width: 200,
            height: 150,
        },
        config: {
            ...widgetConfig,
        },
    };
    const newWidgets: TWidget<any>[] = widgets.slice();
    newWidgets.push(newWidget);
    return newWidgets;
};

export const executeDeleteWidget = (widgets: TWidget<any>[], id: string): TWidget<any>[] => {
    return widgets.filter((widget) => widget.id !== id);
};

export const executeEditWidget = <T>(widgets: TWidget<any>[], id: string, widgetConfig: T): TWidget<any>[] => {
    return widgets.map((widget) => {
        if (widget.id !== id) {
            return widget;
        }
        return {
            ...widget,
            config: widgetConfig,
        };
    });
};
