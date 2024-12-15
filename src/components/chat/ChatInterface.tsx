import React, { useRef, useEffect } from 'react';
import { useChatStore, useSuggestionStore } from './store';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { NavItem } from '../history/NavItem';
// import { request } from 'http';
import { getIdToken } from '../../utils/auth';


export function ChatInterface() {
  const { messages,chatId, setMessage, chats, setChats, setChatId } = useChatStore();

  const { suggestions, removeSuggestion} = useSuggestionStore();
  const { setInput} = useChatStore();
  const messagesEndRef = useRef<HTMLInputElement | null>(null);
  const inputFieldRef = useRef<HTMLInputElement>(null);

  const fetchChats = async () => {
    const response = await fetch(`https://gcdzehfy8c.execute-api.ap-southeast-1.amazonaws.com/chat-stage/chat`,{
      method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'id_token': 'eyJraWQiOiIwVXVcL256QXozOTBuK05Wdk1BQ09OWlJxWXBJbHFnQjh2eUx4S3FNTUtucz0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiWkVpSkVSTXRyTEFXOENHT0JzR2NNUSIsInN1YiI6IjA5ZmFkNTBjLWIwNjEtNzA4OS02OGIwLWI5MDBhY2E1NTUxZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGhlYXN0LTEuYW1hem9uYXdzLmNvbVwvYXAtc291dGhlYXN0LTFfUWxYMXdwa0l1IiwiY29nbml0bzp1c2VybmFtZSI6IjA5ZmFkNTBjLWIwNjEtNzA4OS02OGIwLWI5MDBhY2E1NTUxZSIsImF1ZCI6IjU5bHRmNzQ1bDVwc3BpNHNxYm90M29ydTdvIiwiZXZlbnRfaWQiOiI1MmJmM2EzMC0zZjU4LTRmZTUtOWZiYi0wMGVmZDg1ZDI3MzMiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTczMzg4NjA1NiwibmFtZSI6Imp1bGwiLCJleHAiOjE3MzM5NzI0NTYsImlhdCI6MTczMzg4NjA1NiwianRpIjoiNTNhNTRiNTQtNjlhOS00NjVjLThlMGItZGRhNDZiZjA0NGYwIiwiZW1haWwiOiJ0b255anVuaW9yZmNAZ21haWwuY29tIn0.FeYWUBckr2fC2UJpmmhZt0o57YZ26QeNCkmRzWsTiVvYNYsSioZib-dHUCmnnqSzANY0TqiLMetletd6x9VBq4TH1BfoA-G1pBmhLrX5el7dZnAXTUvsoa6n07_J0l3GmvhosOK-W_OZBfsxQmkdB0bSmPyXTrtgx7rBXdHt2xb8iSrPfo8CZ9YkAhH4QzPZcEQBYuuk6H0HdxNu5K8T_Ai93s-TLsJy3BDpgUhGKvI1XAmLxbeKuSv5eTVagwQFRgx7PlyE9uEWuL5YuPYTd05vaIwhwIQCrrEPs7Atwk-Lm_E_CfNmDzhiGC9NlGvjSjfihjV9bEDKEPgNPEFmdw',
        },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch chats');
    }
    console.log("hasilnya apa " + response.ok);
    return response.json();
  };
  
  useEffect(() => {
    inputFieldRef.current?.focus();
    fetchChats()
      .then((data) => {
        setChats(data.reverse());
        console.log("ahai");
      })
      .catch((error: Error) => {
        alert(`Error fetching chats, please try again later. ${error}`);
      });
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion); // Update input value
    removeSuggestion(suggestion); // Remove suggestion from the list
  };

  const newChat = () => {
    setChatId(null);
    console.log(setChatId);
    setMessage([]);
    console.log(setMessage);
    inputFieldRef?.current?.focus();
    console.info('gagal')
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const sendMessage = async (message: string | null) => {
    try {
      const requestPyload = {
        'prompt': message,
        'chat_id': ''
      }
      console.log(JSON.stringify(requestPyload));

      const id_token = getIdToken();
      const response = await fetch(`https://gcdzehfy8c.execute-api.ap-southeast-1.amazonaws.com/chat-stage/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'id_token': `${id_token}`,
        },
        body: JSON.stringify(requestPyload),
      });
      console.log(response.ok);
      const data = await response.json(); // Sesuaikan tipe response jika perlu
      console.log('Response:', data);
  
      return data; // Mengembalikan data chat dan pesan
    } catch (error) {
      console.error('Error', error);
      return null; // Bisa mengembalikan null atau objek error sesuai dengan kebijakan aplikasi
    }
  };


const handleSendMessage = (input: string) => {
  // Ambil state dan setter dari Zustand

  const newMessage: Message = {
    role: "user",
    content: [
      {
        text: input
      }
    ]
  };

  // Update state messages di Zustand
  setMessage([...messages, newMessage]);

  // Fungsi untuk scroll ke bawah
  scrollToBottom();
  

  sendMessage(input).then((response) => {
    if (!response) {
      // Menangani kasus jika response adalah null atau undefined
      console.error('Response is null or undefined');
      return; // Keluar dari fungsi jika tidak ada response
    }
    if (!chatId) {
      setChats([response.chat, ...chats]);
    }
    setChatId(response.chat.id); // Update chatId di Zustand
    setMessage([...messages, newMessage, response.message]); // Update messages di Zustand
    scrollToBottom(); // Scroll setelah pesan dikirim
  });
};


  return (
    <div className="h-screen overflow:scroll flex-1 flex flex-col bg-[#1C325B]">
      <div className="flex-1 flex items-center justify-center flex-col gap-4">
        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
          <span className="text-2xl">✨</span>
        </div>
        <h1 className="text-white text-2xl font-semibold">Ask our AI anything</h1>
      </div>

      <div className="p-8">
        {/* <div className="mb-6">
          <p className="text-white text-sm font-medium mb-4">Suggestions on what to ask Our AI</p>
          <div className="flex gap-2 flex-wrap">
            <SuggestionButton>What can I ask you to do?</SuggestionButton>
            <SuggestionButton>Which one of my projects is performing the best?</SuggestionButton>
            <SuggestionButton>What projects should I be concerned about right now?</SuggestionButton>
          </div>
        </div> */}

        {/* Suggestion Buttons */}
        <div mb-6>
        <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md text-sm text-white mb-6"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>
      </div>


        {/* Menampilkan saran */}
        <div className="">
            <ChatMessages messages={messages} />
            <div ref={messagesEndRef} />
        </div>
        

        <ChatInput onSendMessage={handleSendMessage} ref={inputFieldRef} />
        <NavItem active={!chatId} onClick={() => newChat()}>
            <div className="bg-[#1a1f2e]"></div>
        </NavItem>
      </div>
      </div>
  );
}
