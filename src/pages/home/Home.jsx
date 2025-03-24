import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Messages from '../../components/messages/Messages';

const Home = () => {
  return (
    <div className='flex h-screen rounded-lg overflow-hidden bg-gray-400'>
      {/* Sidebar */}
      <Sidebar />
      
      {/* Messages Area */}
      <div className="flex-grow p-4">
        <Messages />
      </div>
    </div>
  );
};

export default Home;
