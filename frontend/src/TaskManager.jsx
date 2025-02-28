
import React, { useEffect, useState, useContext } from 'react';
import { FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { CreateTask, DeleteTaskById, GetAllTasks, UpdateTaskById } from './functions';
import { notify } from './utils';
import { StoreContext } from '../Context/StoreContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function TaskManager({ setShowLogin }) {
    const [taskInput, setTaskInput] = useState('');
    const [taskList, setTaskList] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [editableTask, setEditableTask] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const { token } = useContext(StoreContext);

    useEffect(() => {
        if (token) loadUserTasks();
    }, [token]);

    useEffect(() => {
        if (editableTask) setTaskInput(editableTask.taskName);
    }, [editableTask]);

    const loadUserTasks = async () => {
        setIsLoading(true);
        try {
            const response = await GetAllTasks();
            if (response?.data) {
                setTaskList(response.data);
                setFilteredTasks(response.data);
            } else {
                setTaskList([]);
                setFilteredTasks([]);
            }
        } catch (err) {
            console.error(err);
            notify('Failed to fetch tasks', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleTaskAction = async () => {
        if (!taskInput.trim()) return;

        if (!token) {
            setShowLogin(true);
            return;
        }

        const taskData = { taskName: taskInput, isDone: editableTask?.isDone || false };
        try {
            if (editableTask) {
                await updateExistingTask(editableTask._id, taskData);
            } else {
                await addNewTask(taskData);
            }
        } catch (err) {
            console.error(err);
            notify('Task operation failed', 'error');
        }
        setTaskInput('');
        setEditableTask(null);
    };

    const addNewTask = async (taskData) => {
        try {
            const { success, message } = await CreateTask(taskData);
            notify(message, success ? 'success' : 'error');
            if (success) loadUserTasks();
        } catch (err) {
            console.error(err);
            notify('Failed to create task', 'error');
        }
    };

    const updateExistingTask = async (id, taskData) => {
        try {
            const { success, message } = await UpdateTaskById(id, taskData);
            notify(message, success ? 'success' : 'error');
            if (success) loadUserTasks();
        } catch (err) {
            console.error(err);
            notify('Failed to update task', 'error');
        }
    };

    const removeTask = async (id) => {
        try {
            const { success, message } = await DeleteTaskById(id);
            notify(message, success ? 'success' : 'error');
            if (success) loadUserTasks();
        } catch (err) {
            console.error(err);
            notify('Failed to delete task', 'error');
        }
    };

    const toggleTaskStatus = async (task) => {
        if (!token) {
            setShowLogin(true);
            return;
        }
        await updateExistingTask(task._id, { ...task, isDone: !task.isDone });
    };

    const filterTasks = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setTaskList(filteredTasks.filter((task) => task.taskName.toLowerCase().includes(searchTerm)));
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center text-primary fw-bold mb-3">Task Manager</h1>

            <div className="card shadow p-4 rounded-4" style={{ backgroundColor: '#e8effc' }}>
               
                <div className="d-flex flex-column align-items-center mb-3" style={{ width: '50%', margin: '0 auto' }}>
                    
                    <div className="input-group mb-2 w-100">
                        <input 
                            type="text" 
                            value={taskInput} 
                            onChange={(e) => setTaskInput(e.target.value)} 
                            className="form-control"
                            placeholder="Enter a new task..." 
                        />
                        <button 
                            onClick={handleTaskAction} 
                            className="btn btn-primary custom-btn"
                            disabled={!taskInput.trim()}
                        >
                            <FaPlus className="icon" /> <span className="hover-text">Add</span>
                        </button>
                    </div>

                  
                    <div className="input-group w-100">
                        <input 
                            onChange={filterTasks} 
                            className="form-control" 
                            type="text" 
                            placeholder="Search tasks..." 
                        />
                        <span className="input-group-text bg-primary text-white"><FaSearch /></span>
                    </div>
                </div>

              
                {isLoading && <p className="text-center text-muted">Loading tasks...</p>}

             
                <div className="list-group">
                    {taskList.length !== 0 ? (
                        taskList.map((task, index) => (
                            <div 
                                key={task._id} 
                                className={`list-group-item d-flex justify-content-between align-items-center border rounded-3 p-3 mb-2 ${
                                    task.isDone ? "bg-success text-white" : "bg-white"
                                } shadow-sm`} style={{ cursor: 'pointer' }}
                            >
                                <div className="d-flex align-items-center">
                                    <span className="fw-bold text-dark me-3">{index + 1}.</span>
                                    <span className={`flex-grow-1 ${task.isDone ? "text-decoration-line-through text-muted" : "text-dark"}`}>
                                        {task.taskName}
                                    </span>
                                </div>

                                <div className="button-group">
                                    <button onClick={() => toggleTaskStatus(task)} className="btn custom-btn btn-outline-success">
                                        <FaCheck className="icon" /> <span className="hover-text">Done</span>
                                    </button>
                                    <button onClick={() => setEditableTask(task)} className="btn custom-btn btn-outline-warning">
                                        <FaPencilAlt className="icon" /> <span className="hover-text">Edit</span>
                                    </button>
                                    <button onClick={() => removeTask(task._id)} className="btn custom-btn btn-outline-danger">
                                        <FaTrash className="icon" /> <span className="hover-text">Delete</span>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        !isLoading && <p className="text-center text-muted">No tasks available.</p>
                    )}
                </div>
            </div>

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </div>
    );
}

export default TaskManager;
