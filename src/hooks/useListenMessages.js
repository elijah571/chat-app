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
            
            // Log to verify the audio file is loaded and played
            sound.oncanplaythrough = () => {
                console.log("Audio is ready to be played.");
                sound.play().catch((err) => console.error("Error playing audio:", err));
            };

            // Log any errors during audio play
            sound.onerror = (err) => {
                console.error("Error loading audio:", err);
            };

            sound.play().catch((err) => console.error("Error playing audio:", err));

          
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage); 
        };
    }, [socket, setMessages]); 
};
