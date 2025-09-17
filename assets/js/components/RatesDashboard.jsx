import React, { useState } from 'react';
import CurrentRatesTable from './CurrentRatesTable';
import DatePicker from './DatePicker';
import LoadingSpinner from './LoadingSpinner';
import { useRate } from '../hooks';

const SUPPORTED_CURRENCIES = ['EUR', 'USD', 'CZK', 'IDR', 'BRL'];

const CURRENCY_NAMES = {
    EUR: 'Euro',
    USD: 'US Dollar',
    CZK: 'Czech Koruna',
    IDR: 'Indonesian Rupiah',
    BRL: 'Brazilian Real',
};

const CurrencyRateCard = ({ currency, selectedDate }) => {
    const { data: rate, loading, error, refetch } = useRate(currency, selectedDate);

    return (
        <div className="col-md-6 col-lg-4 mb-3">
            <div className="card h-100 currency-card">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h5 className="card-title mb-0 currency-code">{currency}</h5>
                            <small className="text-muted">{CURRENCY_NAMES[currency]}</small>
                        </div>
                        <button 
                            className="btn btn-outline-primary refresh-btn"
                            onClick={refetch}
                            disabled={loading}
                            title="Refresh rate"
                        >
                            🔄
                        </button>
                    </div>
                    
                    {loading && (
                        <div className="loading-container">
                            <LoadingSpinner size="small" message="" />
                        </div>
                    )}
                    
                    {error && (
                        <div className="alert alert-danger py-2" role="alert">
                            <small>{error}</small>
                        </div>
                    )}
                    
                    {rate && !loading && (
                        <div>
                            <div className="currency-rate mb-2">
                                {rate.mid ? rate.mid.toFixed(4) : '—'} PLN
                            </div>
                            <small className="text-muted">
                                {rate.effectiveDate || 'No date'}
                            </small>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const RatesDashboard = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className="dashboard-container">
            <h1 className="text-center dashboard-title">NBP Currency Exchange</h1>
            
            <div className="row mb-5">
                <div className="col-md-6 offset-md-3">
                    <div className="date-picker-container">
                        <DatePicker
                            value={selectedDate}
                            onChange={handleDateChange}
                            label="Select Date"
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                {SUPPORTED_CURRENCIES.map((currency) => (
                    <CurrencyRateCard
                        key={currency}
                        currency={currency}
                        selectedDate={selectedDate}
                    />
                ))}
            </div>
            
            <div className="row mt-5">
                <div className="col-12">
                    <div className="text-center">
                        <p className="text-muted mb-0">
                            <small>
                                Live rates from National Bank of Poland • Updated for {selectedDate}
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RatesDashboard;
