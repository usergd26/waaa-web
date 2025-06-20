// src/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';
import type { LoginRequest } from '../interfaces/Authentication';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const cred: LoginRequest = { email: email, password: password }
    const response = await AuthService.login(cred)

    if (response) {
      const isAdmin = await AuthService.isAdminUser();

      if (isAdmin) {
        // Redirect to the Dashboard on successful login
        navigate('/dashboard');
      }
      else{
        alert('Unauthorized acess')
      }
    }
    setLoading(false);
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
          {loading && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                          <div className="w-12 h-12 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
                        </div>
                      )}
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
