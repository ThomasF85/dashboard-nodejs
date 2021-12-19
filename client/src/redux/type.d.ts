import { DashboardMode } from '../common/dashboard-mode';
import { WidgetType } from './widget-type.types';

export type DashboardState = {
    widgets: TWidget[];
    latestUneditedWidgets: TWidget[];
    mode: DashboardMode;
    addWidgetModalShown: boolean;
    editWidgetModal: { shown: boolean; type: WidgetType; id: string };
    loading: boolean;
};

export type DashboardAction = {
    type: string;
    payload?: any;
};

export type PositionAndSize = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export type TWidget<T> = {
    id: string;
    type: WidgetType;
    positionAndSize: PositionAndSize;
    config: T;
};
