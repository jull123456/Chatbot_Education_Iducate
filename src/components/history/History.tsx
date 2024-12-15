import React, { useEffect} from 'react';
import { useChatStore } from '../chat/store';
import { NavItem } from './NavItem'; // import NavItem and DrawerBackdrop components
// import { getIdToken } from '../../utils/auth';
import { getHeaders } from '../../services/api';
import logo from './chat.png'

export function History() {
  const { chats, chatId, setChats, setChatId, setMessage, messagesEndRef, inputFieldRef, setShowResults} = useChatStore();
  // const [isClicked, setIsClicked] = useState(false);


  useEffect(() => {
    // Example fetch to set the initial chats (you could use an API call here)
    const fetchChats = async () => {
      const response = await fetch(`https://gcdzehfy8c.execute-api.ap-southeast-1.amazonaws.com/chat-stage/chats`,{
        method : 'GET',
        headers: getHeaders(),
      });
      const data = await response.json();
      setChats(data);
    };

    fetchChats();
  }, [setChats]);
  
  // const handleClick = () => {
  //   setIsClicked(!isClicked); // Membalikkan nilai state
  // };

  const scrollToBottom = (): void => {
    setTimeout(() => {
      messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const fetchChatHistory = async (chatId: string): Promise<any> => {
      const response = await fetch(`https://gcdzehfy8c.execute-api.ap-southeast-1.amazonaws.com/chat-stage/chat/${chatId}`,{
        method: 'GET',
        headers: getHeaders(),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch chat history');
      }
      // const data = await response.json();
      // setMessage(data);
      // scrollToBottom();
      // console.log(`ini ada isinya ngga ${data}`);
      // inputFieldRef.current?.focus();
      return response.json();
  };

  const openChat = (chatId: string) => {
    setShowResults(true);
    setChatId(chatId);
    fetchChatHistory(chatId).then((data) => {
      setMessage(data);
      console.log(data);
      console.log(chatId);
      scrollToBottom();
      inputFieldRef.current?.focus(); // Fokuskan input jika ada
    });
  };

  return (
    <div className="bg-gray-800 text-white p-4 mt-2 rounded-lg h-40 overflow-y-scroll overflow-x-scroll">
      <ul>
        {chats.length > 0 && (
          <ul className="space-y-2">
            {chats.slice(0,5).map((chat, index) => (
              <NavItem key={index} active={chatId === chat.id} onClick={() => openChat(chat.id)}>
                <button 
                 className={"flex items-center text-white hover:bg-white/10"}

                //  flex items-center ${isClicked ? 'bg-blue-500 text-white' : 'bg-transparent'}
                >
                  <img src={logo} alt="" className="h-6 w-6 mr-2" />
                  <span>{chat.title}</span>
                </button>
              </NavItem>
            ))}
          </ul>
        )}
      </ul>
      
      {/* {drawerOpen && <DrawerBackdrop onClick={() => setDrawerOpen(false)} />}
      <div ref={messagesEndRef}>
        {messages.map((msg) => (
          <div key={msg.id} className="message">
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <input ref={inputFieldRef} type="text" className="mt-4 p-2 bg-gray-700 text-white rounded" /> */}
    </div>
  );
}
