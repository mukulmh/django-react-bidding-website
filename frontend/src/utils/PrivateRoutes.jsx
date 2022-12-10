import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const PrivateRoutes = () => {
    let user = {'logged_in': true}
    return(
        user.logged_in ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes