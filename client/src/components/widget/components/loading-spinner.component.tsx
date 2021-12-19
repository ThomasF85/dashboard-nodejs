import React from 'react';
import { Spinner } from 'react-bootstrap';
import './loading-spinner.component.scss';

const LoadingSpinner: React.FC = () => <Spinner className="loading-spinner" animation="border" role="status" />;

export default LoadingSpinner;
