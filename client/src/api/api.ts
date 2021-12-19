import axios, { AxiosResponse } from 'axios';
import { TWidget } from '../redux/type';

const WIDGETS_ENDPOINT = '/api/widgets';
const BAR_CHART_DATA_ENDPOINT = '/api/data/bar';
const PIE_CHART_DATA_ENDPOINT = '/api/data/pie';

export const getWidgets: (successCB: (widgets: TWidget<any>[]) => any, failureCB: (err: any) => any) => void = (
    successCB: (widgets: TWidget<any>[]) => any,
    failureCB: (err: any) => any,
) => {
    axios.get(WIDGETS_ENDPOINT).then(
        (res: AxiosResponse<TWidget<any>[]>) => successCB(res.data),
        (err) => failureCB(err),
    );
};

export const saveWidgets: (
    widgets: TWidget<any>[],
    successCB: (widgets: TWidget<any>[]) => any,
    failureCB: (err: any) => any,
) => void = (widgets: TWidget<any>[], successCB: (widgets: TWidget<any>[]) => any, failureCB: (err: any) => any) => {
    axios.put(WIDGETS_ENDPOINT, widgets).then(
        (res: AxiosResponse<TWidget<any>[]>) => successCB(res.data),
        (err) => failureCB(err),
    );
};

export const getBarChartData: (
    bars: number,
    successCB: (data: number[]) => any,
    failureCB: (err: any) => any,
) => void = (bars: number, successCB: (data: number[]) => any, failureCB: (err: any) => any) => {
    axios.get(`${BAR_CHART_DATA_ENDPOINT}?bars=${bars}`).then(
        (res: AxiosResponse<{ data: number[] }>) => successCB(res.data.data),
        (err) => failureCB(err),
    );
};

export const getPieChartData: (successCB: (data: number[]) => any, failureCB: (err: any) => any) => void = (
    successCB: (data: number[]) => any,
    failureCB: (err: any) => any,
) => {
    axios.get(PIE_CHART_DATA_ENDPOINT).then(
        (res: AxiosResponse<{ data: number[] }>) => successCB(res.data.data),
        (err) => failureCB(err),
    );
};
