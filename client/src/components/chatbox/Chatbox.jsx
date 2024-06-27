import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../../store/userConversation";
import useSendMessage from "../../hooks/useSendMessage";
import useGetMessages from "../../hooks/useGetMessages";
import { useAuthContext } from "../../context/AuthContext";
import useListenMessages from "../../hooks/useListenMessages";
import useConvertToBase64 from "../../hooks/useConvertToBase64";

const Chatbox = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [message, setMessage] = useState({ message: "", image: "" });
  const { loading, sendMessage } = useSendMessage();
  useListenMessages();
  const { authUser } = useAuthContext();
  const { loadingMessages, messages } = useGetMessages();
  const { convertBase64 } = useConvertToBase64();

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
    setMessage({ message: "", image: "" });
  };

  const convertToBase64 = (e) => {
    console.log("File input change event:", e);
    const file = e.target.files[0];
    if (file) {
      console.log("File selected:", file);
      convertBase64(file, (base64) => {
        if (!base64) {
          toast.error("Error converting image");
          return;
        }
        setMessage({ message: message.message, image: base64 });
      });
    } else {
      console.log("No file selected");
    }
    e.target.value = null;
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
                    messages.length === 0 ? (
                      <p className="text-sm text-gray-500">Begin converation</p>
                    ) : (
                      <p>loading...</p>
                    )
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message._id}
                        className={"p-2 my-2 bg-gray-200 mr-auto rounded-tr-lg"}
                      >
                        {message.senderId === authUser._id ? (
                          <p>
                            <b>
                              {" "}
                              <i>{authUser.username} </i>
                            </b>
                            : {message.message}{" "}
                            {message.image && (
                              <img
                                src={message.image}
                                alt="message"
                                className="w-20 h-20"
                              />
                            )}
                          </p>
                        ) : (
                          <p>
                            <b>{selectedConversation.username} </b>:{" "}
                            {message.message}
                            {message.image && (
                              <img
                                src={message.image}
                                alt="message"
                                className="w-20 h-20"
                              />
                            )}
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
                    onChange={(e) =>
                      setMessage({
                        message: e.target.value,
                        image: message.image,
                      })
                    }
                    value={message.message}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={convertToBase64}
                  />
                  {message.image && (
                    <img
                      src={message.image}
                      alt="message"
                      className="w-20 h-20"
                    />
                  )}
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
