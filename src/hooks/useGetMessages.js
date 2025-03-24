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

        // Fetch messages for the selected conversation
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        
        // Check if the response is valid
        if (!res.ok) {
          throw new Error('Failed to fetch messages');
        }

        const data = await res.json();

        // Handle any API errors in the response
        if (data.error) {
          throw new Error(data.error);
        }

        // Check if the fetched data is different from the existing messages (by message ID or timestamp)
        // This prevents unnecessary updates to the state.
        if (messages?.[0]?._id !== data?.[0]?._id) {
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
  }, [selectedConversation?._id, setMessages]); // No need to depend on `messages` here

  return { messages, loading };
};
