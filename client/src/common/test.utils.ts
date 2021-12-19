import { WidgetType } from './wiget-type';
import { DashboardState, TWidget } from '../redux/type';
import { DashboardMode } from './dashboard-mode';

export const TEST_STATE: DashboardState = {
    widgets: [
        {
            type: WidgetType.PIE_CHART,
            id: 'firstID',
            positionAndSize: { x: 50, y: 50, width: 200, height: 150 },
            config: {
                headline: 'Chart no. 1',
            },
        },
        {
            type: WidgetType.BAR_CHART,
            id: 'secondID',
            positionAndSize: { x: 500, y: 200, width: 200, height: 150 },
            config: {
                bars: 3,
            },
        },
    ],
    latestUneditedWidgets: [],
    mode: DashboardMode.READ,
    addWidgetModalShown: false,
    editWidgetModal: { shown: false, type: WidgetType.BAR_CHART, id: '' },
    loading: false,
};
