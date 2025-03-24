import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useSendMessage } from "../../hooks/useSendMessages";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return; // Prevent empty message submission
    await sendMessage(message);
    setMessage("");
  };

  return (
    <div>
      <form
        className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 text-white"
        onSubmit={handleSubmit} // Corrected from onClick to onSubmit
      >
        <div className="w-full relative">
          <input
            type="text"
            placeholder="Send message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          />
          <button
            type="submit"
            className="absolute inset-y-0 end-0 flex items-center pe-3"
          >
            {loading ? (
              <div className="loading loading-spinner"></div>
            ) : (
              <IoIosSend className="text-white" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
