import { useEffect, useState, useCallback } from "react";

export default function TaskList({ refresh }) {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    sortBy: "",
  });

  const fetchTasks = useCallback(async () => {
    const query = new URLSearchParams(filters);
    const res = await fetch(`http://localhost:3000/tasks?${query.toString()}`);
    const data = await res.json();
    setTasks(data);
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [refresh, fetchTasks]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const updateTask = async (id, status) => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchTasks();
  };

  return (
    <div>
      <h2>Tasks</h2>

      {/* Filter and Sort Controls */}
      <div style={{ marginBottom: "15px" }}>
        <label>Status: </label>
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <label style={{ marginLeft: "10px" }}>Priority: </label>
        <select
          name="priority"
          value={filters.priority}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <label style={{ marginLeft: "10px" }}>Sort By: </label>
        <select
          name="sortBy"
          value={filters.sortBy}
          onChange={handleFilterChange}
        >
          <option value="">None</option>
          <option value="due_date">Due Date</option>
        </select>
      </div>

      {/* Task List */}
      {tasks.length === 0 && <p>No tasks found.</p>}

      {tasks.map((t) => (
        <div key={t.id}>
          <h3>{t.title}</h3>
          <p>{t.description}</p>
          <p>Priority: {t.priority}</p>
          <p>Status: {t.status}</p>
          <button onClick={() => updateTask(t.id, "Done")}>Mark Done</button>
        </div>
      ))}
    </div>
  );
}
