import React from 'react';
import PropTypes from 'prop-types';

const LoadingSpinner = ({ size, message, className }) => {
    const sizeClass = size === 'small' ? 'fa-2x' : 'fa-4x';
    const containerClass = `text-center ${className}`;

    return (
        <div className={containerClass}>
            <div className="d-flex flex-column align-items-center">
                <i className={`fa fa-spinner fa-spin ${sizeClass} text-primary mb-2`}></i>
                {message && (
                    <p className="text-muted">{message}</p>
                )}
            </div>
        </div>
    );
};

LoadingSpinner.propTypes = {
    size: PropTypes.oneOf(['small', 'large']),
    message: PropTypes.string,
    className: PropTypes.string,
};

LoadingSpinner.defaultProps = {
    size: 'large',
    message: 'Loading...',
    className: '',
};

export default LoadingSpinner;
