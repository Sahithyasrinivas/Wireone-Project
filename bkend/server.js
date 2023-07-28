const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000; 
app.use(cors());
const dbURI = 'mongodb://127.0.0.1:27017/todo'; 
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
const taskSchema = new mongoose.Schema({
  "id": Number,
  "title": String,
  "subTasks": [String],
  "assignee": String,
  "dueDate": String,
  "priority": String,
});
const Task = mongoose.model('Task', taskSchema);
app.use(express.json())
app.use(bodyParser.json());
app.get("/",(req,res)=>{
    res.end("hello")
})
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.post('/api/gettasks', (req, res) => {
    const newTask = req.body;
    console.log(req.body)
    const createdTask = new Task(newTask);
    createdTask.save().then((response)=>res.json(response)).catch (error=> {
    res.status(500).json({ error: 'Internal server error' });
  })
})
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
