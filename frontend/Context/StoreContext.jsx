import axios from 'axios';
import { createContext, useEffect, useState } from "react";
import { fetchAllTasks } from '../../backend/Controllers/TaskController';

export const StoreContext = createContext(null)

const StoreContextProvider = (props) =>{
    
    const url = "http://localhost:4000";
    const [token,setToken] = useState(localStorage.getItem("token") || "");
    const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [tasks,setTasks] = useState([]);

    useEffect(() => {
       
        // if(localStorage.getItem("token")){
        //     setToken(localStorage.getItem("token"));
        // }

        if(token) {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            setUser(storedUser);
            // fetchTasks();
            fetchAllTasks()
        }
    }, [token])

    const fetchTasks = async () => {
        if (!token) return;

        try {
            const response = await axios.get(`${url}/api/tasks`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                setTasks(response.data.tasks);
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };



    return (
        <StoreContext.Provider value={{url,token,setToken, user, setUser, tasks, setTasks, fetchTasks}}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;