import React, { useEffect, useState } from 'react';
import { Bar, BarChart as Chart, XAxis } from 'recharts';
import { Form } from 'react-bootstrap';
import { IWidget, TInnerWidget, TWidgetEditor } from '../widget.types';
import { getBarChartData } from '../../../api/api';
import LoadingSpinner from '../components/loading-spinner.component';

type TBarChart = {
    bars: number;
};

const BarChartEditor: React.FC<TWidgetEditor<TBarChart>> = (props: TWidgetEditor<TBarChart>) => {
    const { widgetConfig, setWidgetConfig } = props;
    const onBarsChange: (bars: number) => any = (bars: number) => {
        const newConfig: TBarChart = {
            ...widgetConfig,
            bars,
        };
        setWidgetConfig(newConfig);
    };

    return (
        <Form.Group className="mb-3" controlId="barChartForm">
            <Form.Label>Number of bars</Form.Label>
            <Form.Control
                type="number"
                placeholder="Enter headline"
                value={widgetConfig.bars}
                onChange={(e) => onBarsChange(parseInt(e.target.value))}
            />
        </Form.Group>
    );
};

type TBarChartData = {
    id: number | string;
    val: number;
};

const BarChartWidget: React.FC<TInnerWidget<TBarChart>> = (props: TInnerWidget<TBarChart>) => {
    const { width, height, config } = props;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<TBarChartData[]>([]);

    useEffect(() => {
        setLoading(true);
        getBarChartData(
            config.bars,
            (fetchedData: number[]) => {
                const bars: any[] = fetchedData.map((value, index) => {
                    return { id: index + 1, val: value };
                });
                setData(bars);
                setLoading(false);
            },
            (err: any) => console.log(err),
        );
    }, [config]);

    return (
        <div
            className="inner-widget"
            style={{
                backgroundColor: 'rgba(0,0,0,.1)',
                width: width + 'px',
                height: height + 'px',
            }}
        >
            {loading ? (
                <LoadingSpinner />
            ) : (
                <Chart width={width} height={height} data={data}>
                    <XAxis dataKey="id" />
                    <Bar dataKey="val" fill="#0d6efd" />
                </Chart>
            )}
        </div>
    );
};

const defaultConfig: TBarChart = {
    bars: 3,
};

const BarChart: IWidget<TBarChart> = {
    widget: BarChartWidget,
    widgetEditor: BarChartEditor,
    defaultConfig,
};

export default BarChart;
