import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

    const storedUser = localStorage.getItem("User");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if(!user || !user.username) {
        return <Navigate to="/" replace/>
    }

  return <Outlet/>
}

export default ProtectedRoute