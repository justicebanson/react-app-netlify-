
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/Slices/authSlice";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    //dispatch function and navigate function
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect(()=> {
    //     //check if the user already exist
    //     const storedUser = localStorage.getItem("User");
    //     if(storedUser){
    //         navigate("/profile");
    //     }
    // }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setError("");
        try{
            const response = await fetch("https://render-webserver-csqu.onrender.com/login", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body:JSON.stringify({username, password}),
            });
            const data = await response.json();
            if(!response.ok){
                setError(data.message || "Login failed.");
                return;
            }
            dispatch(login({username, token: data.accessToken}));
            localStorage.setItem( "User", JSON.stringify({username, token: data.accessToken}));
            navigate("/profile");
        }
        catch(error){
            setError("Login failed. Please try again");
            console.log("Error", error);
        }

    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    { error && <div style={{color:"red",marginBottom:"1rem"}}>{error}</div>}

                    <div className="form-group">
                        <button className="btn btn-block">
                            <span>Login</span>
                        </button>
                    </div>
                    <div className="mt-3">
                        <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

//Profile

