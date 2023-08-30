import React from 'react';
import SideNav from '../../components/SideNav';
import Header from '../../components/Header';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <>
            <div className='flex sticky top-0 left-0'>
                <SideNav />
                <div className='flex flex-col flex-1'>
                    <Header />
                    <div className='p-[20px] overflow-y-scroll'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminLayout;
