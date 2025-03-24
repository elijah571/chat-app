import React from "react";
import Conversation from "../Conversation";
import { useGetConversation } from "../../hooks/useGetConversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversation();

  console.log("📢 Conversations List:", conversations);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {loading && <span className="loading loading-spinner"></span>}

      {conversations.length > 0 ? (
        conversations.map((conversation, i) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            lastIndex={i === conversations.length - 1}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No conversations found.</p>
      )}
    </div>
  );
};

export default Conversations;
