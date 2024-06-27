import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  myMessages: [],
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  setMyMessages: (myMessages) => set({ myMessages }),
}));

export default useConversation;
