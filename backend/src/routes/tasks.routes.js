const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, getInsights } = require('../services/tasks.service');

// POST /tasks - create
router.post('/', (req, res) => {
  const { title, description, priority, due_date, status } = req.body;
  const missingFields = [];
  if (!title) missingFields.push('title');
  if (!priority) missingFields.push('priority');
  if (!due_date) missingFields.push('due_date');

  // If any field is missing, return error message
  if (missingFields.length > 0) {
    const errorMessage =
      missingFields.length === 1
        ? `${missingFields[0]} is required`
        : `${missingFields.join(', ')} are required`;

    return res.status(400).json({ error: errorMessage });
  }
  const task = createTask({ title, description, priority, due_date, status });
  res.status(201).json(task);
});

// GET /tasks - list/filter/sort
router.get('/', (req, res) => {
  const tasks = getTasks(req.query);
  res.json(tasks);
});

// PATCH /tasks/:id - update status/priority
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  updateTask(id, req.body);
  res.json({ message: 'Task updated successfully.' });
});

// GET /insights
router.get('/insights', (req, res) => {
  const data = getInsights();
  res.json(data);
});

module.exports = router;
