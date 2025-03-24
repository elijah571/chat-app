import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversation';
import notificationSound from '../asset/sounds/notification.mp3';

export const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { setMessages, messages } = useConversation();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      console.log("Received new message:", newMessage);

      const sound = new Audio(notificationSound);
      sound.play();

      // Ensure we're appending the new message to the previous ones
      setMessages((prevMessages) => {
        // Check for duplicates before appending
        const isDuplicate = prevMessages.some((msg) => msg._id === newMessage._id);
        if (!isDuplicate) {
          console.log("Appending new message:", newMessage);
          return [...prevMessages, newMessage];  // Append new message
        } else {
          console.log("Duplicate message, not adding:", newMessage);
          return prevMessages;  // Avoid duplicates
        }
      });
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [socket, setMessages]);

  // Log the messages state after update
  useEffect(() => {
    console.log("Messages after state update:", messages);
  }, [messages]); // This will ensure the updated messages are logged when they change
};
