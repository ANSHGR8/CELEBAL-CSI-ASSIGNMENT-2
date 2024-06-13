import React, { useState, useEffect } from 'react';
import './TodoList.css';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("date");

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (newTask.trim() === "") {
            alert("Task cannot be empty");
            return;
        }
        const newTasks = [...tasks, { text: newTask, completed: false, date: new Date() }];
        setTasks(newTasks);
        setNewTask("");
    };

    const removeTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    const toggleTaskCompletion = (index) => {
        const newTasks = tasks.map((task, i) => i === index ? { ...task, completed: !task.completed } : task);
        setTasks(newTasks);
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === "completed") return task.completed;
        if (filter === "incomplete") return !task.completed;
        return true;
    });

    const sortedTasks = filteredTasks.sort((a, b) => {
        if (sort === "date") return new Date(a.date) - new Date(b.date);
        if (sort === "alphabetical") return a.text.localeCompare(b.text);
        return 0;
    });

    return (
        <div>
            <h1>To-Do List</h1>
            <div>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="New Task"
                />
                <button onClick={addTask}>Add Task</button>
            </div>
            <div>
                <label>
                    Filter: 
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="incomplete">Incomplete</option>
                    </select>
                </label>
                <label>
                    Sort: 
                    <select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="date">Date</option>
                        <option value="alphabetical">Alphabetical</option>
                    </select>
                </label>
            </div>
            <ul>
                {sortedTasks.map((task, index) => (
                    <li key={index} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        {task.text}
                        <button onClick={() => toggleTaskCompletion(index)}>
                            {task.completed ? "Undo" : "Complete"}
                        </button>
                        <button onClick={() => removeTask(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;