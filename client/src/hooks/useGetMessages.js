import { useEffect, useState } from "react";
import useConversation from "../store/useConversation";
const useGetMessages = () => {
  const [loadingMessages, setLoadingMessages] = useState(false);
  const { messages, setMessages, selectedConversation, myMessages } =
    useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoadingMessages(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        const data = await res.json();
        console.log(myMessages);
        setMessages(data);
        if (data.error) {
          throw new Error(data.error);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingMessages(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation, setMessages, myMessages]);
  return { loadingMessages, messages };
};

export default useGetMessages;
