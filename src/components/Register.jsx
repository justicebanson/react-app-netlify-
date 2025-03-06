
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/Slices/authSlice";

const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    //dispatch function and navigate function
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateInputs = () =>{
        if(!username || username.trim() === "" || username.length < 3){
            return "Username must be at leat 3 characters."
        }
        const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
        if(!email || !emailRegex.test(email)){
            return "Please enter a valid email address";
        }
        if(!password || password.length < 8){
            return "Password enter a valid email address";
        }

        return "";
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        const validationError = validateInputs();
        if(validationError){
            setError(validationError);
            return;
        }
        try{
            //dispatch an action
            // console.log("Form submitted with values: ", {username, email,password});
            // localStorage.setItem("User", JSON.stringify({username,email,password}));
            // dispatch(login({username,email,password}));
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({username, email, password}),
            });
            const data = await response.json();
            if(!response.ok){
                setError(data.message || " Registeration failed. Please try again.");
                return;
            }

            navigate("/");
        } catch(err){
            setError("Registration failed. Please try again.");
            console.log("Error Message", err);
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
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
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
                        { error && <div style={{color: "red", marginBottom: "1rem"}}>{error}</div>}
                    <div className="form-group">
                        <button className="btn btn-primary btn-block">
                            <span>Registration</span>
                        </button>
                    </div>
                    <div className="mt-3">
                        <p>Already have an account? <Link to="/">Login Here</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
