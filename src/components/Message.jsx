import React from "react";
import { useAuthContext } from "../context/AuthContext";
import useConversation from "../zustand/useConversation";
import { extractTime } from "../pages/utils/formatedTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  // Ensure message is structured properly
  const structuredMessage = typeof message === "string" ? { text: message } : message;
  console.log("Structured Message:", structuredMessage);

  // Prevent errors if authUser is null/undefined
  const fromMe = structuredMessage?.senderId === authUser?.user?._id;

  // Get profile picture
  const profilePic = fromMe ? authUser?.user?.profile : selectedConversation?.profle || "default-avatar-url";

  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-500";
  const chatClassName = fromMe ? "justify-end" : "justify-start";
  
  const timeFormat = structuredMessage?.createdAt ? extractTime(structuredMessage.createdAt) : "N/A";

  return (
    <div className={`flex ${chatClassName} mb-4`}>
      <div className="chat-image avatar mr-2">
        <div className="w-10 h-10 rounded-full">
          <img alt="Profile" src={profilePic} />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="chat-header text-sm">
          {fromMe ? authUser?.user?.fullName : selectedConversation?.userName}
          <time className="text-xs opacity-50 ml-2">{timeFormat}</time>
        </div>
        <div className={`chat-bubble ${bubbleBgColor} text-white p-2 rounded-lg`}>
          {structuredMessage?.message || structuredMessage?.text}
        </div>
        <div className="chat-footer opacity-50 text-xs">
          {structuredMessage?.status}
        </div>
      </div>
    </div>
  );
};

export default Message;
