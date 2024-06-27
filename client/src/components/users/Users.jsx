import React from "react";
import useConversation from "../../store/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import Chatbox from "../chatbox/Chatbox";
const Users = () => {
  const { loading, conversations } = useGetConversations();
  const { setSelectedConversation } = useConversation();
  return (
    <>
      <div className="flex w-full h-screen">
        <div className="w-1/3 p-4 overflow-auto mx-20">
          <h1 className="text-2xl font-bold text-center mt-10">
            Conversations
          </h1>
          <div className="max-w-4xl mx-auto mt-9">
            {loading ? (
              <p className="text-center">Loading conversations...</p>
            ) : (
              conversations.map((conversation) => (
                <div
                  key={conversation._id}
                  className="flex items-center justify-between p-4 border-b border-gray-300 hover:bg-gray-100 transition duration-200 cursor-pointer"
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div>
                    <p className="font-bold">{conversation.username}</p>
                    <p className="text-gray-600">{conversation.lastMessage}</p>
                  </div>
                  <p className="text-gray-500">{conversation.date}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="w-1/2 p-4 overflow-auto">
          <Chatbox />
        </div>
      </div>
    </>
  );
};

export default Users;
