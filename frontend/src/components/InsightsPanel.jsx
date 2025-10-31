import { useEffect, useState } from 'react';

export default function InsightsPanel() {
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/tasks/insights')
      .then(res => res.json())
      .then(setInsights);
  }, []);

  if (!insights) return <p>Loading insights...</p>;

  return (
    <div>
      <h2>Smart Insights</h2>
      <p>{insights.summary}</p>
    </div>
  );
}
