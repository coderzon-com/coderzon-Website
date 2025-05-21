'use client'
import React from 'react';
import CountUp from 'react-countup';

const Count = () => {
    return (
        <>
            <CountUp end={20} enableScrollSpy />
        </>
    );
};

export default Count;