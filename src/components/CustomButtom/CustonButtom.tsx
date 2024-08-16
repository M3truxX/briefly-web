import React from 'react';
import './custonButtom.scss';
import { CustomButtomProps } from '../../data/models/interfaces/CustomButtomProps';

const CustonButtom: React.FC<CustomButtomProps> = ({ text, activate = true, loading = false, onClick, }) => {
    const handleClick = () => {
        if (activate && !loading) {
            onClick();
        }
    };

    return (
        <button
            className={`button sombras ${activate ? '' : 'desable'} ${loading ? 'loading' : ''}`}
            onClick={handleClick}
            type="submit"
            disabled={!activate || loading}
        >
            {loading ? <div className="spinner" /> : text}
        </button>
    );
};

export default CustonButtom;