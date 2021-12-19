import React from 'react';
import { DashboardState } from './type';
import dashboardReducer from './dashboard.reducer';
import { addWidget, deleteWidget } from './dashboard.actions';
import { WidgetType } from '../common/wiget-type';
import { defaultConfig } from '../components/widget/widgets';
import { TEST_STATE } from '../common/test.utils';

test('reducer handles action delete widget correctly', () => {
    const newState: DashboardState = dashboardReducer(TEST_STATE, deleteWidget(TEST_STATE.widgets[0].id));
    expect(newState.widgets).toHaveLength(1);
    expect(newState.widgets[0]).toBe(TEST_STATE.widgets[1]);
});

test('reducer handles action add widget correctly', () => {
    const newState: DashboardState = dashboardReducer(
        TEST_STATE,
        addWidget(WidgetType.BAR_CHART, defaultConfig(WidgetType.BAR_CHART)),
    );
    expect(newState.widgets).toHaveLength(3);
    expect(newState.widgets[0]).toBe(TEST_STATE.widgets[0]);
    expect(newState.widgets[1]).toBe(TEST_STATE.widgets[1]);
    expect(newState.widgets[2].type).toBe(WidgetType.BAR_CHART);
    expect(newState.widgets[2].config).toStrictEqual(defaultConfig(WidgetType.BAR_CHART));
});
