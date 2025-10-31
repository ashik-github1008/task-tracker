import { useState } from 'react';

export default function TaskForm({ onTaskCreated }) {
  const [form, setForm] = useState({ title: '', description: '', priority: 'Low', due_date: '', status: 'Open' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      setForm({ title: '', description: '', priority: 'Low', due_date: '', status: 'Open' });
      onTaskCreated();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Task</h2>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <select name="priority" value={form.priority} onChange={handleChange}>
        <option>Low</option><option>Medium</option><option>High</option>
      </select>
          <input type="date" name="due_date" value={form.due_date} onChange={handleChange} required />
          <div>
        <label>Status:</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option>Open</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
}
