import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';  // Import React icons
import SearchInput from './SearchInput';
import Conversations from './Conversations';
import Logout from './Logout';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // State to toggle sidebar open/close

  const toggleSidebar = () => {
    setIsOpen(prevState => !prevState); // Toggle the sidebar state
  };

  return (
    <div className={`flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-1'} md:w-64 border-r border-slate-500 p-4`}>
      {/* Search */}
      <SearchInput />
      <div className='divider px-3'></div>

      {/* Conversations */}
      <Conversations />
      
      {/* Logout */}
      <Logout />

      {/* Toggle button on small screens */}
      <button
        onClick={toggleSidebar}
        className='md:hidden absolute top-4 left-4 p-2 bg-gray-800 text-white rounded-full'
      >
        {isOpen ? (
          <FiX size={24} /> // Close icon when sidebar is open
        ) : (
          <FiMenu size={24} /> // Menu icon when sidebar is closed
        )}
      </button>
    </div>
  );
};

export default Sidebar;
