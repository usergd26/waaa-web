// src/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService, type LoginRequest } from '../services/AuthService';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cred: LoginRequest = {email: email, password: password}
    AuthService.login(cred)

    // Check credentials
    // if (email === 'SHREYASINGH7297@GMAIL.COM' && password === 'admin1234') {
    //   // Redirect to the Dashboard on successful login
    //   navigate('/dashboard');
    // } else {
    //   alert('Invalid email or password. Please try again.');
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4">Login</h2>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white px-4 py-2 rounded-md hover:from-pink-600 hover:to-blue-600 transition-all duration-300">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
