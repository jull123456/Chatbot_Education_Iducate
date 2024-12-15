import { useChatStore } from "./store";
export const newChat = (inputFieldRef: React.RefObject<HTMLInputElement>) => {
    const { messages,chatId, setMessage, chats, setChats, setChatId, showResults, setShowResults,recentPrompt, setRecentPrompt} = useChatStore();
    setShowResults(false);
    setChatId(null);
    console.log(setChatId);
    setMessage([]);
    console.log(setMessage);
    inputFieldRef?.current?.focus();
    console.info('gagal')
  };