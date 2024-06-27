import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../../store/userConversation";
import useSendMessage from "../../hooks/useSendMessage";
import useGetMessages from "../../hooks/useGetMessages";
import { useAuthContext } from "../../context/AuthContext";
import useListenMessages from "../../hooks/useListenMessages";

const Chatbox = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  useListenMessages();
  const { authUser } = useAuthContext();
  const { loadingMessages, messages } = useGetMessages();
  console.log(messages);
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
                <div className="overflow-auto h-96 w-full bg-gray-100 p-4 rounded-lg">
                  {loadingMessages ? (
                    <p>loading...</p>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message._id}
                        className={"p-2 my-2 bg-gray-200 mr-auto rounded-tr-lg"}
                      >
                        {message.senderId === authUser._id ? (
                          <p>
                            <b> {authUser.username} </b>: {message.message}{" "}
                          </p>
                        ) : (
                          <p>
                            <b>{selectedConversation.username} </b>:{" "}
                            {message.message}{" "}
                          </p>
                        )}
                      </div>
                    ))
                  )}
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
