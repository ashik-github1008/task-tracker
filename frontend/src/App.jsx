import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import InsightsPanel from './components/InsightsPanel';

export default function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Task Tracker</h1>
      <TaskForm onTaskCreated={() => setRefresh(!refresh)} />
      <TaskList refresh={refresh} />
      <InsightsPanel refresh={refresh} />
    </div>
  );
}
