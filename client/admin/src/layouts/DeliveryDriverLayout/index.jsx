import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SideNav from '../../components/SideNav';
import Header from '../../components/Header';
import { Outlet } from 'react-router-dom';
import ViewDeliveryDriver from './ViewDeliveryDriver';
import AddDeliveryDriver from './AddDeliveryDriver';

const DeliveryDriverLayout = () => {
    return (
        <>
            <div className='flex sticky top-0 left-0'>
                <SideNav />
                <div className='flex flex-col flex-1'>
                    <Header />
                    <div className='p-[20px] overflow-y-scroll pt-20'>
                        <Outlet />
                        <Routes>
                            <Route>
                                <Route path='view-delivery-driver' element={<ViewDeliveryDriver />} />
                                <Route path='add-delivery-driver' element={<AddDeliveryDriver />} />
                            </Route>
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeliveryDriverLayout;
