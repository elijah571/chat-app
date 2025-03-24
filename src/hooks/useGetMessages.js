import { useEffect, useState } from 'react';
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

export const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        // Check if we have a selected conversation
        if (!selectedConversation?._id) {
          toast.error("No conversation selected");
          return;
        }

        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        const data = await res.json();

        // Handle any API errors
        if (data.error) {
          throw new Error(data.error);
        }

        // Only update messages if they differ from the current ones
        if (JSON.stringify(data) !== JSON.stringify(messages)) {
          setMessages(data);
        }
      } catch (error) {
        toast.error(error.message || "Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    // Only fetch messages when a conversation is selected
    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, setMessages, messages]); // Watch for selected conversation or messages change

  return { messages, loading };
};
