const db = require('../db/database');

// Create Task
function createTask(task) {
  const stmt = db.prepare(`
    INSERT INTO tasks (title, description, priority, due_date, status)
    VALUES (?, ?, ?, ?, ?)
  `);
  const info = stmt.run(task.title, task.description, task.priority, task.due_date, task.status || 'Open');
  return { id: info.lastInsertRowid, ...task };
}

// Get Tasks with optional filters/sorting
function getTasks(filters = {}) {
  let query = 'SELECT * FROM tasks WHERE 1=1';
  const params = [];

  if (filters.status) {
    query += ' AND status = ?';
    params.push(filters.status);
  }
  if (filters.priority) {
    query += ' AND priority = ?';
    params.push(filters.priority);
  }
  if (filters.sortBy === 'due_date') {
    query += ' ORDER BY due_date ASC';
  }

  return db.prepare(query).all(...params);
}

// Update Task (status/priority)
function updateTask(id, data) {
  const fields = [];
  const params = [];

  if (data.status) {
    fields.push('status = ?');
    params.push(data.status);
  }
  if (data.priority) {
    fields.push('priority = ?');
    params.push(data.priority);
  }

  if (fields.length === 0) return;

  params.push(id);
  const query = `UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`;
  db.prepare(query).run(...params);
}

// Insights
function getInsights() {
  const totalOpen = db.prepare("SELECT COUNT(*) AS count FROM tasks WHERE status = 'Open'").get().count;
  const priorityCounts = db.prepare("SELECT priority, COUNT(*) AS count FROM tasks GROUP BY priority").all();
  const soonTasks = db.prepare("SELECT COUNT(*) AS count FROM tasks WHERE julianday(due_date) - julianday('now') <= 3 AND status != 'Done'").get().count;

  // Simple rule-based summary
  let summary = `You have ${totalOpen} open tasks. `;
  const highPriority = priorityCounts.find(p => p.priority === 'High');
  if (highPriority && highPriority.count > totalOpen / 2) {
    summary += 'Most of them are high priority. ';
  }
  if (soonTasks > 0) {
    summary += `${soonTasks} tasks are due within 3 days!`;
  }

  return {
    totalOpen,
    priorityCounts,
    soonTasks,
    summary: summary.trim(),
  };
}

module.exports = { createTask, getTasks, updateTask, getInsights };
