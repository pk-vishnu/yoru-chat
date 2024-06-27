import { useEffect, useState } from "react";
import useConversation from "../store/userConversation";
const useGetMessages = () => {
  const [loadingMessages, setLoadingMessages] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoadingMessages(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        const data = await res.json();
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
  }, [selectedConversation, setMessages]);
  return { loadingMessages, messages };
};

export default useGetMessages;
