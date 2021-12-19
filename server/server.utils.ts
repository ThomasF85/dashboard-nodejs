import {TWidget} from "../client/src/redux/type";
import {WidgetType} from "../client/src/common/wiget-type";

export const INITIAL_STATE: TWidget<any>[] = [
        {
            type: WidgetType.PIE_CHART,
            id: 'firstID',
            positionAndSize: { x: 450, y: 300, width: 400, height: 250 },
            config: {
                headline: 'Chart no. 2',
            },
        },
        {
            type: WidgetType.BAR_CHART,
            id: 'secondID',
            positionAndSize: { x: 450, y: 0, width: 400, height: 250 },
            config: {
                bars: 4,
            },
        },
    ];