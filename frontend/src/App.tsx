import React, { useEffect, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import AboutPage from './pages/AboutPage';

type HealthResponse = {
  status: string;
  environment: string;
  uptime: number;
  timestamp: string;
};

const HomePage: React.FC = () => {
  const [message, setMessage] = useState<string>('Connecting to backend...');
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const testResponse = await fetch('http://localhost:5000/api/test');
        const testData = await testResponse.json();
        setMessage(testData.message);

        const healthResponse = await fetch('http://localhost:5000/api/health');
        const healthData: HealthResponse = await healthResponse.json();
        setHealth(healthData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Error connecting to backend server');
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg bg-white text-lg text-slate-600 shadow">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg bg-white p-6 text-center shadow">
        <h1 className="text-3xl font-semibold text-slate-900">
          MERN DevOps Practice App
        </h1>
        <p className="mt-2 text-slate-600">
          Monitor the backend connection and explore project features.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-slate-800">
            Backend Connection Test
          </h2>
          <p className="mt-4 text-slate-600">{message}</p>
        </article>

        <article className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-slate-800">System Health</h2>
          {health ? (
            <dl className="mt-4 space-y-2 text-slate-600">
              <div>
                <dt className="font-medium text-slate-700">Status</dt>
                <dd>{health.status}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-700">Environment</dt>
                <dd>{health.environment}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-700">Uptime</dt>
                <dd>{Math.floor(health.uptime)} seconds</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-700">Timestamp</dt>
                <dd>{new Date(health.timestamp).toLocaleString()}</dd>
              </div>
            </dl>
          ) : (
            <p className="mt-4 text-slate-600">
              Unable to retrieve health details at this time.
            </p>
          )}
        </article>
      </section>

      <section className="rounded-lg bg-white p-6 shadow">
        <h3 className="text-xl font-semibold text-slate-800">Features</h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          <li className="rounded-md border border-slate-200 bg-slate-50 p-4">
            ✅ Express.js Backend with TypeScript
          </li>
          <li className="rounded-md border border-slate-200 bg-slate-50 p-4">
            ✅ React Frontend with TypeScript
          </li>
          <li className="rounded-md border border-slate-200 bg-slate-50 p-4">
            ✅ CORS Configuration
          </li>
          <li className="rounded-md border border-slate-200 bg-slate-50 p-4">
            ✅ Health Check Endpoint
          </li>
          <li className="rounded-md border border-slate-200 bg-slate-50 p-4">
            ✅ Simple API Communication
          </li>
          <li className="rounded-md border border-slate-200 bg-slate-50 p-4">
            ✅ Tailwind CSS utilities ready to use
          </li>
        </ul>
      </section>
    </div>
  );
};

const App: React.FC = () => (
  <div className="min-h-screen bg-slate-100">
    <header className="bg-white shadow">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <span className="text-lg font-semibold text-slate-900">
          DevOps MERN Practice
        </span>
        <div className="flex gap-3 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              [
                'rounded-md px-3 py-2 transition-colors',
                isActive
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
              ].join(' ')
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              [
                'rounded-md px-3 py-2 transition-colors',
                isActive
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
              ].join(' ')
            }
          >
            About
          </NavLink>
        </div>
      </nav>
    </header>

    <main className="mx-auto max-w-5xl px-4 py-10">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </main>
  </div>
);

export default App;
