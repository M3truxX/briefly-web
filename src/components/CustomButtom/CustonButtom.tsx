import React from 'react';
import './custonButtom.scss';
import { CustomButtomProps } from '../../data/models/interfaces/CustomButtomProps';

const CustonButtom: React.FC<CustomButtomProps> = ({ theme, text, activate = true, loading = false, onClick, }) => {
    const handleClick = () => {
        if (activate && !loading) {
            onClick();
        }
    };

    return (
        <button
            className={`button ${activate ? '' : 'desable'} ${loading ? 'loading' : ''} ${theme === 'light' ? 'light' : 'dark'}`}
            onClick={handleClick}
            type="submit"
            disabled={loading}
        >
            {loading ? <div className="spinner" /> : text}
        </button>
    );
};

export default CustonButtom;