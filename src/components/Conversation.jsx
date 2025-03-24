import React, { useCallback } from "react";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";

const Conversation = ({ conversation, lastIndex }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  
  const isSelected = selectedConversation?._id === conversation._id;
  const isOnline = onlineUsers.includes(conversation._id); // Keeping original check

  // Optimize click handler using useCallback to prevent unnecessary re-renders
  const handleClick = useCallback(() => {
    setSelectedConversation(conversation);
  }, [conversation, setSelectedConversation]);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={handleClick}
      >
        <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profle} alt={conversation.fullName} /> 
            {/* Keeping 'profle' as is */}
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <p>{conversation.fullName}</p>
        </div>
      </div>
      {!lastIndex && <div className="divider py-0 my-0 h-1"></div>}
    </>
  );
};

export default Conversation;
