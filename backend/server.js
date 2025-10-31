const express = require('express');
const cors = require('cors');
const path = require('path');
const tasksRouter = require('./src/routes/tasks.routes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/tasks', tasksRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
