import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Use useNavigate for redirect
import useLogin from '../../hooks/useLogin';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { loading, login } = useLogin();
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(userName, password);
    navigate('/');  // Redirect on success
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-gray-800">
      <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-gray-700">
        <h1 className="text-3xl font-semibold text-center text-white mb-6">Login</h1>
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label htmlFor="username" className="text-white block mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your username"
              className="w-full p-3 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="text-white block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner"></span> : 'Login'}
          </button>
        </form>

        {/* Register Link */}
        <div className="text-center mt-5">
          <p className="text-white">
            Don't have an account?{' '}
            <Link to={'/signup'} className="underline text-blue-400 hover:text-blue-300">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
