'use client';

import { useState, useEffect } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [message, setMessage] = useState('');

  // Obtener token CSRF
  useEffect(() => {
    const getCsrfToken = async () => {
      const response = await fetch('http://localhost:3000/csrf-token', {
        credentials: 'include',
      });
      const data = await response.json();
      setCsrfToken(data.csrfToken);
    };
    getCsrfToken();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ username, password, csrfToken }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage('✅ Login exitoso');
    } else {
      setMessage(`❌ Error: ${data.error}`);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label><br />
          <input
            type="text"
            id="username"
            required
            autoFocus
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label><br />
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <input type="hidden" id="csrfToken" value={csrfToken} />
        <button type="submit">Iniciar Sesión</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
