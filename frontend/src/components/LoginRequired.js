import React, { useContext, useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { UserContext } from '../GlobalContext'

function LoginRequired() {
    const {user} = useContext(UserContext);
    const location = useLocation();

  return (
    user?
    <Outlet/>
    :<Navigate to='login' state={{from:location.pathname}} replace/>
  )
}

export default LoginRequired;