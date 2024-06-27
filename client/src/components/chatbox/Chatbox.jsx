import React, { useEffect, useState } from "react";
import useConversation from "../../store/userConversation";
import useSendMessage from "../../hooks/useSendMessage";
import toast from "react-hot-toast";
const Chatbox = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) {
      toast.error("Message cannot be empty");
      return;
    }
    await sendMessage(message);
    setMessage("");
  };

  return (
    <>
      <div>
        {selectedConversation ? (
          <>
            <div className="w-full flex flex-col">
              <div className="flex-grow overflow-auto p-4">
                <h1 className="text-xl font-bold mb-2">
                  Chatting with {selectedConversation.username}
                </h1>
                <div className="bg-gray-100 p-3 rounded-lg mb-4 py-48">
                  Messages appear here
                </div>
              </div>
              <form className="p-4" onSubmit={handleSubmit}>
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Type a message"
                    className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-slate-800 text-white p-2 rounded-r-lg hover:bg-gray-400"
                  >
                    {loading ? "Sending..." : "Send"}
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <p className="text-gray-500">
            Select a conversation to start chatting
          </p>
        )}
      </div>
    </>
  );
};

export default Chatbox;
