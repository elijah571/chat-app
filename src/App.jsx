import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';

const App = () => {
  const { authUser } = useAuthContext();

  return (
    <div className=" h-full">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4">
        <h1 className='text-center text-2xl'>Chat</h1>
      </header>

     

        {/* Main Content */}
        <main className=" p-8">
          <Routes>
            <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
            <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup />} />
          </Routes>
        </main>
      

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default App;
