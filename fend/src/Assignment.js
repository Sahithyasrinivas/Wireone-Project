import React, { useState,useEffect  } from 'react';
import axios from 'axios';
import './Assignment.css'; 
const Assignment = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetchTasks();
  }, []);
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks'); 
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  const Add = async () => {
    const newTask = {
      id: tasks.length + 1,
      title: '',
      subTasks: [],
      assignee: '',
      dueDate: '',
      priority: 'Low',
    };
    try {
      const response = await axios.post('http://localhost:5000/api/gettasks', newTask);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  const changeTask = (index, field, value) => {
    const upd = [...tasks];
    upd[index][field] = value;
    setTasks(upd);
  };
  const AddSub = (taskIndex) => {
    const upd = [...tasks];
    upd[taskIndex].subTasks.push('');
    setTasks(upd);
  };
  const changeSubTask = (taskIndex, subIndex, value) => {
    const upd = [...tasks];
    upd[taskIndex].subTasks[subIndex] = value;
    setTasks(upd);
  };
  const Remove = (index) => {
    const upd = tasks.filter((_, i) => i !== index);
    setTasks(upd);
  };
  const RemoveSubTask = (taskIndex, subIndex) => {
    const upd = [...tasks];
    upd[taskIndex].subTasks = upd[taskIndex].subTasks.filter((_, i) => i !== subIndex);
    setTasks(upd);
  };
  return (
    <div className="c1">
      {tasks.map((task, index) => (
        <div key={task.id} className="task">
          <input
            type="text"
            placeholder="Task title"
            value={task.title}
            onChange={(e) => changeTask(index, 'title', e.target.value)}/>
        <button onClick={() => Remove(index)}>Remove Task</button>
          <div>
            <label>Assignee:</label>
            <input
              type="text"
              placeholder="Assignee"
              value={task.assignee}
              onChange={(e) =>
                changeTask(index, 'assignee', e.target.value)}/>
          </div>
          <div>
            <label>Due Date:</label>
            <input
              type="date"
              value={task.dueDate}
              onChange={(e) => changeTask(index, 'dueDate', e.target.value)}/>
          </div>
          <div>
            <label>Priority:</label>
            <select
              value={task.priority}
              onChange={(e) => changeTask(index, 'priority', e.target.value)}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <button onClick={() => AddSub(index)}>Add Sub-task</button>
            {task.subTasks.map((subTask, subIndex) => (
              <div key={subIndex} className="subtask">
          <input
                  type="text"
                  placeholder="Sub-task"
                  value={subTask}
                  onChange={(e) =>
                    changeSubTask(index, subIndex, e.target.value)}/>
                <button
                  onClick={() => RemoveSubTask(index, subIndex)}>
                  Remove Sub-task
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={Add}>Add Task</button>
    </div>
  );
};
export default Assignment;
