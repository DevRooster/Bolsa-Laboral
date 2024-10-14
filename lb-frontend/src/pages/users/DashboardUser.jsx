import React from 'react'
import NavbarUser from '../../components/NavbarUser'
import { Outlet, useLocation } from 'react-router-dom';

const DashboardUser = () => {
    const location = useLocation();

    const isDashUserPath = location.pathname === '/user';
    return (

        <div>
            <NavbarUser />
            {isDashUserPath && <h2>DashboardUser</h2>}
            <Outlet />
        </div>

    )
}

export default DashboardUser