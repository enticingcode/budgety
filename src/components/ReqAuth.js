import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth'

const ReqAuth = ({ children }) => {

    const auth = useAuth();


    if (!auth.user) {
        console.log('not online');
        return <Navigate to='/' />
    }

    return children
}

export default ReqAuth