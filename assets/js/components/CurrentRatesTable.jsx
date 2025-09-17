import React from 'react';
import PropTypes from 'prop-types';

const CurrentRatesTable = ({ rates, selectedDate }) => {
    return (
        <div className="card">
            <div className="card-header">
                <h5>Current Exchange Rates - {selectedDate}</h5>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Currency</th>
                                <th>Code</th>
                                <th>Mid Rate (PLN)</th>
                                <th>Effective Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(rates).map(([currency, data]) => (
                                <tr key={currency}>
                                    <td>
                                        <strong>{currency}</strong>
                                    </td>
                                    <td>{currency}</td>
                                    <td>
                                        {data.rate ? (
                                            <span className="badge badge-success">
                                                {data.rate.mid.toFixed(4)}
                                            </span>
                                        ) : (
                                            <span className="text-muted">—</span>
                                        )}
                                    </td>
                                    <td>
                                        {data.rate?.effectiveDate || '—'}
                                    </td>
                                    <td>
                                        {data.rate ? (
                                            <span className="badge badge-success">✓ Available</span>
                                        ) : (
                                            <span className="badge badge-warning" title={data.error}>
                                                ⚠ Error
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

CurrentRatesTable.propTypes = {
    rates: PropTypes.objectOf(
        PropTypes.shape({
            rate: PropTypes.shape({
                code: PropTypes.string,
                mid: PropTypes.number,
                effectiveDate: PropTypes.string,
            }),
            error: PropTypes.string,
        })
    ).isRequired,
    selectedDate: PropTypes.string.isRequired,
};

export default CurrentRatesTable;
