import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../asset/sounds/notification.mp3";

export const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { setMessages } = useConversation();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      console.log("Received new message:", newMessage); // Debugging log

      // Play sound notification on new message
      const sound = new Audio(notificationSound);
      sound.play();

      // Add new message to the conversation
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.on("newMessage", handleNewMessage);

    // Cleanup listener on unmount
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, setMessages]);
};
