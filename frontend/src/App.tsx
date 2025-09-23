import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [health, setHealth] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch test message
        const testResponse = await fetch('http://localhost:5000/api/test');
        const testData = await testResponse.json();
        setMessage(testData.message);

        // Fetch health status
        const healthResponse = await fetch('http://localhost:5000/api/health');
        const healthData = await healthResponse.json();
        setHealth(healthData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Error connecting to backend server');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1 style={{ color: '#333', textAlign: 'center' }}>
        MERN DevOps Practice App
      </h1>
      
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2>Backend Connection Test</h2>
        <p style={{ fontSize: '16px', color: '#666' }}>{message}</p>
      </div>

      {health && (
        <div style={{ 
          backgroundColor: '#e8f5e8', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #4caf50'
        }}>
          <h2>System Health</h2>
          <p><strong>Status:</strong> {health.status}</p>
          <p><strong>Environment:</strong> {health.environment}</p>
          <p><strong>Uptime:</strong> {Math.floor(health.uptime)} seconds</p>
          <p><strong>Timestamp:</strong> {new Date(health.timestamp).toLocaleString()}</p>
        </div>
      )}

      <div style={{ 
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#f0f8ff',
        borderRadius: '8px'
      }}>
        
        
        <h1 className="text-3xl font-bold underline">
      Hello world!
      testing tailwind
    </h1>   
        <h3>Features</h3>
        <ul>
          <li>✅ Express.js Backend with TypeScript</li>
          <li>✅ React Frontend with TypeScript</li>
          <li>✅ CORS Configuration</li>
          <li>✅ Health Check Endpoint</li>
          <li>✅ Simple API Communication</li>
        </ul>
      </div>
    </div>
  );
};

export default App;
