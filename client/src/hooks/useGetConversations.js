import { useEffect, useState } from "react";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        setConversations(data);
        if (data.error) {
          throw new Error(data.error);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);
  return { loading, conversations };
};

export default useGetConversations;
