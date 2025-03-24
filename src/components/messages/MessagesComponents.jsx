import React, { useEffect, useRef } from 'react';
import Message from '../Message';
import { useGetMessages } from '../../hooks/useGetMessages';
import MessageSkeleton from '../skeleton/MessageSkeleton';

const MessagesComponents = () => {
  const { messages, loading } = useGetMessages();
  const lastMessageRef = useRef(null);

  useEffect(() => {
    console.log("Messages updated:", messages);  // Debugging messages update

    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);  // Trigger effect when messages change

  return (
    <div className="px-4 flex-1 overflow-auto h-full max-h-[500px]">
      {loading && [...Array(3)].map((_, index) => <MessageSkeleton key={index} />)}

      {!loading && Array.isArray(messages) && messages.length > 0 && messages.map((message, index) => (
        <div key={message._id}>
          {/* Only apply the ref to the last message */}
          {index === messages.length - 1 ? (
            <div ref={lastMessageRef}>
              <Message message={message} />
            </div>
          ) : (
            <Message message={message} />
          )}
        </div>
      ))}

      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default MessagesComponents;
