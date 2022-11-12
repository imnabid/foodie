import { Outlet, useNavigate } from 'react-router-dom'

function NotLoggedIn() {
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token')
    if(!token) return (<Outlet/>)
    return navigate('/')
}

export default NotLoggedIn