import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from '../asset/sounds/notification.mp3';

export const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { setMessages } = useConversation();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      console.log("Received new message:", newMessage);  // Debugging new message event

      const sound = new Audio(notificationSound);
      sound.play();

      // Ensure we're appending the new message to the previous ones
      setMessages((prevMessages) => {
        // Avoid duplicates based on the message ID
        if (!prevMessages.some((msg) => msg._id === newMessage._id)) {
          return [...prevMessages, newMessage];
        }
        return prevMessages; // No change if the message is a duplicate
      });
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, setMessages]);
};
