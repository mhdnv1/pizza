import React from 'react';
import { Outlet } from 'react-router-dom';
import logo from '../../assets/logo.svg'

const Auth = () => {
    return (
        <div className='auth'>
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <div className="content">
                <Outlet/>
            </div>
        </div>
    );
}

export default Auth;
