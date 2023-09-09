import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCartShopping, faChartSimple, faUsers } from '@fortawesome/free-solid-svg-icons'

const SideNav = () => {

    const [activePage, setActivePage] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation().pathname;

    useEffect(() => {
        setActivePage(location);
    }, [location])

    const handleMenu = () => {
        setIsOpen(!isOpen);
        console.log(isOpen)
    }

    const adminNavigation = [
        {
            name: "Dashboard",
            icon: faChartSimple,
            link: "/admin"
        },

        {
            name: "User Management",
            icon: faUsers,
            link: "/view-user"
        },

        {
            name: 'Product Management',
            icon: faCartShopping,
            link: '/products'
        }
    ]

    return (
        <>
            <div className={`h-screen bg-gradient-to-t from-cyan-300 to-cyan-700 w-fit ${isOpen ? 'absolute md:fixed' : ''}`}>
                <div className='px-[20px] h-[64px] uppercase text-white font-bold text-xl w-full flex justify-center items-center gap-[20px]'>
                    <div className={`md:flex text-center ${isOpen ? 'block' : 'hidden'}`}>
                        Admin Panel
                    </div>
                    <div className='text-2xl flex md:hidden hover:text-cyan-900'>
                        <button onClick={() => {handleMenu()}}>
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                    </div>
                </div>
                <div className='grid'>
                    {adminNavigation && adminNavigation.length ? adminNavigation.map((item) => (
                        <Link key={item.link} to={item.link}>
                            <div className={`px-[20px] py-[10px] w-full flex items-center gap-[10px] hover:bg-black hover:bg-opacity-20 ${item.link == activePage ? 'bg-black bg-opacity-40' : ''}`}>
                                <div className='text-white w-[24px]'>
                                    <FontAwesomeIcon icon={item.icon} />
                                </div>
                                <div className={`text-white md:flex ${isOpen ? 'flex' : 'hidden'}`}>
                                    {item.name}
                                </div>
                            </div>
                        </Link>
                    )):(
                        <></>
                    )}
                </div>
            </div>
        </>
    );
}

export default SideNav;
