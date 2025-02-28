
import React, { useContext, useState } from 'react';
import './LoginPopUp.css';
import axios from "axios";
import { StoreContext } from '../../Context/StoreContext';

const LoginPopUp = ({ setShowLogin }) => {
    const { url, setToken, setUser } = useContext(StoreContext);

    const [currentState, setCurrentState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();

        let newUrl = url;
        if (currentState === "Login") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }

        // console.log("Sending Data to API:", newUrl, data); // Debugging

        try {
            const response = await axios.post(newUrl, data, {
                headers: { "Content-Type": "application/json" },
            });

            // console.log("Response from Server:", response.data);

            if (response.data.success) {
                setToken(response.data.token);
                setUser(response.data.user);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                setShowLogin(false);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error in Login/Register API:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currentState === "Sign Up" && (
                        <input 
                            name='name' 
                            onChange={onChangeHandler} 
                            value={data.name} 
                            type="text" 
                            placeholder='Your name' 
                            required 
                        />
                    )}
                    <input 
                        name='email' 
                        onChange={onChangeHandler} 
                        value={data.email} 
                        type="email" 
                        placeholder='Your email' 
                        required 
                    />
                    <input 
                        name='password' 
                        onChange={onChangeHandler} 
                        value={data.password} 
                        type="password" 
                        placeholder='Password' 
                        required 
                    />
                </div>
                <button type='submit'>{currentState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-conditions">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {currentState === "Login" ? (
                    <p>Create an account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
                ) : (
                    <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Click here</span></p>
                )}
            </form>
        </div>
    );
};

export default LoginPopUp;
