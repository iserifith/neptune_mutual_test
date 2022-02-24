import React, { FC, useState } from "react";
import Image from "next/image";

const CurrencyField: FC<any> = ({ label, value, handleChange }) => {
    return (
        <div className='flex flex-row my-2 rounded-sm shadow-sm border'>
            <label className='px-2 py-2 border-r'>{label}</label>
            <input
                className='px-2 py-2'
                type='number'
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};

const Converter = () => {
    const rate = 3;
    const [fromCurrency, setFromCurrency] = useState(0);
    const [toCurrency, setToCurrency] = useState(0);

    const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setFromCurrency(parseFloat(value.toFixed(2)));
        setToCurrency(parseFloat((value * rate).toFixed(2)));
    };
    const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setToCurrency(parseFloat(value.toFixed(2)));
        setFromCurrency(parseFloat((value / rate).toFixed(2)));
    };

    return (
        <div className='flex flex-row'>
            <CurrencyField
                label='NEP'
                value={fromCurrency}
                handleChange={handleFromChange}
            />
            <div className='flex justify-center items-center mx-2'>
                <Image src='/change.png' width={20} height={20} alt='Change' />
            </div>
            <CurrencyField
                label='BUSD'
                value={toCurrency}
                handleChange={handleToChange}
            />
        </div>
    );
};

export default Converter;
