

import React, { useContext } from "react";
import "./Navbar.css";
import { StoreContext } from "../../Context/StoreContext";

const Navbar = ({ setShowLogin }) => {
    const { token, setToken, user, setUser, setTasks } = useContext(StoreContext);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken("");
        setUser(null);
        setTasks([]);
        setShowLogin(true);
    };

    return (
        <div className="navbar">
            <h1>{user ? `Hello, ${user.name}` : "Hello, Guest"}</h1>
            {!token ? (
                <button onClick={() => setShowLogin(true)}>Sign In</button>
            ) : (
                <button onClick={logout}>Logout</button>
            )}
        </div>
    );
};

export default Navbar;
