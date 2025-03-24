import { createContext, useContext, useState, useEffect } from "react";
import io from 'socket.io-client';
import { useAuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext(); 

    useEffect(() => {
        if (!authUser || !authUser.user) {
            console.log("No authUser available, skipping socket connection.");
            return;
        }

        // Make sure that userId is available before trying to connect
        const userId = authUser.user._id;
    

        const socketInstance = io("https://chat-app-4j3t.onrender.com", {
            query: { userId },
            transports: ['websocket'],
        });

        setSocket(socketInstance);

        // Listen for online users from the server
        socketInstance.on("getOnlineUsers", (users) => {
            console.log("Received online users from server:", users);  // Debugging line
            setOnlineUsers(users);  // Update the onlineUsers state
        });

        // Clean up socket connection on unmount or when authUser changes
        return () => {
            socketInstance.close();
            setSocket(null);
        };
    }, [authUser]);  // Re-run the effect whenever authUser changes

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
