import { applyMiddleware, createStore, Store } from 'redux';
import logger from 'redux-logger';
import { DashboardAction, DashboardState } from './type';
import dashboardReducer from './dashboard.reducer';

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store: Store<DashboardState, DashboardAction> = createStore(
    dashboardReducer,
    applyMiddleware(...middlewares),
);
