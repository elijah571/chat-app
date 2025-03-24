import React, { useState } from 'react';
import GenderControl from './GenderControl';
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/useSignup';

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: '',
    userName: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const handleGenderCheckBox = (selectedGender) => {
    setInputs({ ...inputs, gender: selectedGender });
  };

  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
    console.log("Form Submitted", inputs);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md p-4 sm:p-6 rounded-lg shadow-lg bg-gray-700">
        <h1 className="text-3xl font-semibold text-center text-white mb-4">Signup</h1>
        <form className="space-y-4 w-full" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="flex flex-col">
            <label htmlFor="fullName" className="text-white mb-1">Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter your full name"
              value={inputs.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Username */}
          <div className="flex flex-col">
            <label htmlFor="userName" className="text-white mb-1">Username</label>
            <input
              type="text"
              id="userName"
              placeholder="Enter your username"
              value={inputs.userName}
              onChange={(e) => setInputs({ ...inputs, userName: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-white mb-1">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="text-white mb-1">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Re-enter your password"
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Gender */}
          <GenderControl onCheckboxChange={handleGenderCheckBox} selectedGender={inputs.gender} />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner"></span> : "Sign up"}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-4">
          <p className="text-white">
            Already have an account?{" "}
            <Link to="/login" className="underline text-blue-400 hover:text-blue-300">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
