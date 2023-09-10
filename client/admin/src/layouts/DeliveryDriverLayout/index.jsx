import React from 'react';
import Header from '../../components/Header';
import { Outlet, Route, Routes } from 'react-router-dom';



const DriverLayout = () => {
    return (
        <>
            
                <div className='flex flex-col flex-1'>
                    <Header />
                    <div className='p-[20px] overflow-y-scroll pt-20'>
                        <Outlet />
                        
                    </div>
                </div>
            
        </>
    );
}

export default DriverLayout;
