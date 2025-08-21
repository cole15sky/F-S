import React, { useState } from 'react';
import './App.css';
import { useAuth } from './context/AuthContext'; 

function App() {
  const { user, login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
    } catch (error) {
      alert("Login failed!");
      console.error(error);
    }
  };

  return (
    <div className="App">
      {user ? (
        <div>
          <h1>Welcome, {user.email}! 👋</h1>
          <button onClick={logout}>Sign Out</button>
        </div>
      ) : (
        <div>
          <h1>This is ReactApp. Please log in.</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign In</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;