import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from '../asset/sounds/notification.mp3';

export const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { setMessages } = useConversation();

    useEffect(() => {
        if (!socket) return; // Prevent errors if socket is null

        const handleNewMessage = (newMessage) => {
            const sound = new Audio(notificationSound);
            sound.play();

            // ✅ Use functional update to prevent stale state issues
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage); // ✅ Correct event name
        };
    }, [socket, setMessages]); // ✅ No need to include `messages`

};
