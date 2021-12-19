import BarChart from './widgets/barchart';
import PieChart from './widgets/piechart';
import React from 'react';
import { IWidget, TInnerWidget, TWidgetEditor } from './widget.types';
import { WidgetType } from '../../common/wiget-type';

export const WIDGETS = new Map<WidgetType, IWidget<any>>([
    [WidgetType.BAR_CHART, BarChart],
    [WidgetType.PIE_CHART, PieChart],
]);

export const defaultConfig: (type: WidgetType) => any = (type: WidgetType) => {
    if (WIDGETS.get(type) === undefined) {
        console.error(`default config for type ${type} cannot be found`);
        return {};
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return WIDGETS.get(type).defaultConfig;
};

const WidgetComponent = <T,>(props: TInnerWidget<T> & { widgetType: WidgetType }) => {
    if (WIDGETS.get(props.widgetType) === undefined) {
        console.error(`widget for type ${props.widgetType} cannot be found`);
        return null;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const AWidget: React.FC<TInnerWidget<T>> = WIDGETS.get(props.widgetType).widget;
    return <AWidget {...props} />;
};

export const Widget = React.memo(WidgetComponent);

const WidgetEditorComponent = <T,>(props: TWidgetEditor<T> & { widgetType: WidgetType }) => {
    if (WIDGETS.get(props.widgetType) === undefined) {
        console.error(`widget editor for type ${props.widgetType} cannot be found`);
        return null;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const Editor: React.FC<TWidgetEditor<T>> = WIDGETS.get(props.widgetType).widgetEditor;
    return <Editor {...props} />;
};

export const WidgetEditor = React.memo(WidgetEditorComponent);
