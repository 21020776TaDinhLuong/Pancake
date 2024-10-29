import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './actions/userActions'


const Header = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const logoutHandler = () => {
        dispatch(logout())
      }
    return (
        <>
            <nav className="navbar">
                <div className="navbar-left">
                    <a href="/">Logo</a>
                    {!userInfo &&<a href="/about">About</a>}
                    {!userInfo &&<a href="/services">Services</a>}
                    {userInfo &&<a href="/admin/userlist">User Management</a>}
                    {userInfo &&<a href="/admin/productlist">Product Management</a>}
                    {userInfo &&<a href="/admin/orderlist">Order Management</a>}
                    {userInfo &&<a href="/admin/carelist">Care Management</a>}
                    {userInfo &&<a href="/admin/userinfo">User Info</a>}



                </div>
                <div className="navbar-right">
                <button className='loginBtn'>
                        <a href="/loginFanpage">Login Fanpage</a>
                    </button>
                {!userInfo &&<button className='loginBtn'>
                        <a href="/login">Login</a>
                    </button>}
                    {!userInfo &&<button className='signUpBtn'>
                    <a href="/signup">Sign Up</a>
                    </button>}
                    {userInfo && <button className='signUpBtn'><a href="#" onClick={logoutHandler}>Logout</a></button>}

                </div>
            </nav>
        </>
    );
}

export default Header;
