import axios from 'axios';
import { API_URL } from './utils';


export const CreateTask = async (taskObj) => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("No token found, user is not authenticated");
        return { success: false, message: "Unauthorized" };
    }

    const url = `${API_URL}/tasks`;
    console.log("URL:", url);
    console.log("Sending Task:", taskObj);

    try {
        const { data } = await axios.post(url, taskObj, {
            headers: { 
                Authorization: `Bearer ${token}`, // Ensure token is included
                "Content-Type": "application/json"
            }
        });
        return data;
    } catch (err) {
        console.error("Error in CreateTask:", err.response?.data || err.message);
        return { success: false, message: "API Request Failed" };
    }
};


export const GetAllTasks = async () => {
    const token = localStorage.getItem("token");
    const url = `${API_URL}/tasks`;

    if (!token) {
        console.error("No token found, user is not authenticated");
        return { success: false, message: "Unauthorized" };
    }

    try {
        const { data } = await axios.get(url, {
            headers: { 
                Authorization: `Bearer ${token}`, // Ensure token is sent correctly
                "Content-Type": "application/json"
            }
        });
        return data;
    } catch (err) {
        console.error("Error in GetAllTasks:", err.response?.data || err.message);
        return { success: false, message: "Failed to fetch tasks" };
    }
};



export const DeleteTaskById = async (taskId) => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("No token found, user is not authenticated");
        return { success: false, message: "Unauthorized" };
    }

    const url = `${API_URL}/tasks/${taskId}`;
    console.log("Deleting Task:", taskId);
    console.log("Token being sent:", token);

    try {
        const { data } = await axios.delete(url, {
            headers: { 
                Authorization: `Bearer ${token}` 
            }
        });
        return data;
    } catch (err) {
        console.error("Error in DeleteTaskById:", err.response?.data || err.message);
        return { success: false, message: "API Request Failed" };
    }
};


export const UpdateTaskById = async (taskId, updatedTask) => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("No token found, user is not authenticated");
        return { success: false, message: "Unauthorized" };
    }

    const url = `${API_URL}/tasks/${taskId}`;
    console.log("Updating Task:", updatedTask);
    console.log("Token being sent:", token);

    try {
        const { data } = await axios.put(url, updatedTask, {
            headers: { 
                Authorization: `Bearer ${token}`, 
                "Content-Type": "application/json"
            }
        });
        return data;
    } catch (err) {
        console.error("Error in UpdateTaskById:", err.response?.data || err.message);
        return { success: false, message: "API Request Failed" };
    }
};
