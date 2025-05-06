import React, { useState, useEffect } from 'react';
import '../src/App.css'; // Importing external CSS

const ToDoApp = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask('');
  };

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const handleDelete = (index) => {
    if (!tasks[index].completed) {
      const confirmDelete = window.confirm('Are you sure you want to delete this incomplete task?');
      if (!confirmDelete) return;
    }
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const clearAll = () => {
    if (window.confirm('Clear all tasks?')) {
      setTasks([]);
    }
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">My ToDo List</h1>

      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Add a new task"
          className="todo-input"
        />
        <button type="submit" className="todo-button">
          Add
        </button>
      </form>

      <p className="task-counter">
        {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} (
        {tasks.filter(task => task.completed).length} completed)
      </p>

      {tasks.length > 0 && (
        <button className="clear-btn" onClick={clearAll}>
          Clear All
        </button>
      )}

      {tasks.length === 0 ? (
        <p className="todo-empty">No tasks! You're all done!</p>
      ) : (
        <ul className="todo-list">
          {tasks.map((task, index) => (
            <li key={index} className="todo-item">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(index)}
              />
              <span className={task.completed ? 'completed' : ''}>{task.text}</span>
              <button onClick={() => handleDelete(index)} className="todo-delete">❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ToDoApp;