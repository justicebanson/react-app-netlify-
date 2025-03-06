import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/Slices/authSlice";

const Profile = () => {

    const user = useSelector((state)=> state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = ()=> {
        dispatch(logout());
        localStorage.removeItem("User");
        navigate("/");
    }
    
    return (
        <div className="container">
            <header className="jumbotron d-flex justify-content-between">
                <h2>
                    <strong>{user?.username || "User"}</strong> Profile
                </h2>
                <button onClick={handleLogout} className="btn btn-secondary"> Logout</button>
            </header>
            <p>
                <strong>Name: {user?.username || "N/A"}</strong> 
            </p> 
            <p>
                <strong>Email:{user?.email || "N/A"}</strong>
            </p>
        </div>
    );
};

export default Profile;

