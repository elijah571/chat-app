import React, { useLayoutEffect, useRef, useState } from 'react';
import Message from '../Message';
import { useGetMessages } from '../../hooks/useGetMessages';
import MessageSkeleton from '../skeleton/MessageSkeleton';
import { useListenMessages } from '../../hooks/useListenMessages';

const MessagesComponents = () => {
  const { messages, loading } = useGetMessages();
  const lastMessageRef = useRef(null);
  const [isMessagesLoaded, setIsMessagesLoaded] = useState(false);

  // Call the custom hook to listen for new messages
  useListenMessages();

  // Log messages and loading state for debugging
  console.log('Messages:', messages);
  console.log('Loading:', loading);

  // Use useLayoutEffect to ensure DOM is ready before scrolling
  useLayoutEffect(() => {
    // Only scroll when messages are fully loaded and not during the loading phase
    if (!loading && messages.length > 0) {
      console.log('Messages are loaded, waiting before scrolling...');
      // Set a small delay to ensure the DOM is ready
      const timer = setTimeout(() => {
        if (lastMessageRef.current) {
          console.log('Scrolling to the last message');
          lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
          setIsMessagesLoaded(true); // Mark messages as loaded
        }
      }, 300); // Adjust delay to suit your needs

      return () => clearTimeout(timer); // Clean up the timer on component unmount
    }
  }, [messages, loading]); // Runs when messages change or loading state changes

  // Ensure messages is always an array before using map
  const sortedMessages = Array.isArray(messages)
    ? [...messages].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    : [];

  // Log sorted messages to verify order
  console.log('Sorted Messages:', sortedMessages);

  return (
    <div className="px-4 flex-1 overflow-auto h-full max-h-[500px]">
      {/* Show skeleton loaders while loading */}
      {loading && [...Array(3)].map((_, index) => <MessageSkeleton key={index} />)}

      {/* Show messages if available */}
      {!loading && sortedMessages.length > 0 && sortedMessages.map((message, index) => (
        <div
          key={message._id}
          ref={index === sortedMessages.length - 1 ? lastMessageRef : null}
        >
          <Message message={message} />
        </div>
      ))}

      {/* Show empty state if there are no messages */}
      {!loading && sortedMessages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default MessagesComponents;
