import React, { useEffect, useState } from 'react';
import { Pie, PieChart as Chart } from 'recharts';
import { Form } from 'react-bootstrap';
import { IWidget, TInnerWidget, TWidgetEditor } from '../widget.types';
import { getPieChartData } from '../../../api/api';
import LoadingSpinner from '../components/loading-spinner.component';

type TPieChart = {
    headline: string;
};

const PieChartEditor: React.FC<TWidgetEditor<TPieChart>> = (props: TWidgetEditor<TPieChart>) => {
    const { widgetConfig, setWidgetConfig } = props;
    const onHeadlineChange: (headline: string) => any = (headline: string) => {
        const newConfig: TPieChart = {
            ...widgetConfig,
            headline,
        };
        setWidgetConfig(newConfig);
    };

    return (
        <Form.Group className="mb-3" controlId="pieChartForm">
            <Form.Label>Headline of chart</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter headline"
                value={widgetConfig.headline}
                onChange={(e) => onHeadlineChange(e.target.value)}
            />
        </Form.Group>
    );
};

type TPieChartData = {
    id: number | string;
    val: number;
};

const PieChartWidget: React.FC<TInnerWidget<TPieChart>> = (props: TInnerWidget<TPieChart>) => {
    const { width, height, config } = props;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<TPieChartData[]>([]);

    useEffect(() => {
        setLoading(true);
        getPieChartData(
            (fetchedData: number[]) => {
                const pies: any[] = fetchedData.map((value, index) => {
                    return { id: index + 1, val: value };
                });
                setData(pies);
                setLoading(false);
            },
            (err: any) => console.log(err),
        );
    }, []);

    return (
        <div
            className="inner-widget"
            style={{
                backgroundColor: 'rgba(0,0,0,.1)',
                width: width + 'px',
                height: height + 'px',
            }}
        >
            <div>{config.headline}</div>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <Chart width={width} height={height}>
                    <Pie data={data} dataKey="val" cx={width / 2} cy={height / 2 - 20} fill="#696969" />
                </Chart>
            )}
        </div>
    );
};

const defaultConfig: TPieChart = {
    headline: 'Kuchen',
};

const PieChart: IWidget<TPieChart> = {
    widget: PieChartWidget,
    widgetEditor: PieChartEditor,
    defaultConfig,
};

export default PieChart;
