import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext"; // Assuming you have this context

export const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { socket } = useSocketContext(); // Ensure socket context is available

  const sendMessage = async (message) => {
    if (!selectedConversation) {
      toast.error("No conversation selected!");
      return;
    }

    setLoading(true);
    try {
      // Sending message to the server via an API
      const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      // Check if the message was sent successfully
      if (!res.ok) {
        throw new Error(data.message || "Message sending failed");
      }

      // Update messages state with the newly sent message
      setMessages((prevMessages) => [...prevMessages, data]);

      // Emit the new message via socket for real-time update
      if (socket) {
        socket.emit("newMessage", data, (acknowledgment) => {
          // Handle acknowledgment from the server (if needed)
          if (acknowledgment && acknowledgment.success) {
            console.log("Message successfully broadcasted");
          } else {
            console.error("Error broadcasting message");
          }
        });
      }

      // Optionally, show a toast on successful message send
      toast.success("Message sent!");

    } catch (error) {
      toast.error(error.message || "Error sending message");
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
