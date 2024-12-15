import React, { useEffect, useState } from 'react';
import { useChatStore, useSuggestionStore } from './store';
import { assets } from "./assets/assets";
import { ChatInputcopy } from './ChatInputcopy';
import { getIdToken } from '../../utils/auth';
import { getAccessToken } from '../../utils/auth';
import { ChatMessages } from './ChatMessagescopy';
import { useAuthStore } from '../../store/useAuthStore';
import './main.css'
import logo from './chatbot(1).png';
import logo1 from './logo-full-light-mode.png'
import { getHeaders } from '../../services/api';{}

// export const newChat = (inputFieldRef: React.RefObject<HTMLInputElement>) => {
//   const { messages,chatId, setMessage, chats, setChats, setChatId, showResults, setShowResults,recentPrompt, setRecentPrompt} = useChatStore();
//   setShowResults(false);
//   setChatId(null);
//   console.log(setChatId);
//   setMessage([]);
//   console.log(setMessage);
//   inputFieldRef?.current?.focus();
//   console.info('gagal')
// };

// const NewChat = () => {
//   const { messages,chatId, setMessage, chats, setChats, setChatId, showResults, setShowResults,recentPrompt, setRecentPrompt} = useChatStore();
  
//   const newChat = (inputFieldRef: React.RefObject<HTMLInputElement>) => {
//   setShowResults(false);
//   setChatId(null);
//   console.log(setChatId);
//   setMessage([]);
//   console.log(setMessage);
//   inputFieldRef?.current?.focus();
//   console.info('gagal')
//   };
// };


export function ChatInterfacecopy() {
//  const {surveyData} = useAuthStore();
 const { messages,chatId, setMessage, chats, setChats, setChatId, showResults, setShowResults,recentPrompt, setRecentPrompt, messagesEndRef, inputFieldRef} = useChatStore();
 const { suggestions, removeSuggestion, clearSuggestions} = useSuggestionStore();
 const { setInput} = useChatStore();
//  const messagesEndRef = useRef<HTMLInputElement | null>(null);
//  const inputFieldRef = useRef<HTMLInputElement>(null);
 const [loading, setLoading] = useState(false);

 const handleCardClick = (promptText: string): void => {
  setInput(promptText);
};

  const fetchChats = async () => {
    const id_token = getIdToken();
    const access_token = getAccessToken();
      const response = await fetch(`https://gcdzehfy8c.execute-api.ap-southeast-1.amazonaws.com/chat-stage/chats`,{
        method: 'GET',
        headers: getHeaders(),
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
      setShowResults(false);
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
      // try {
      //   const requestPyload = {
      //     'prompt': message,
      //     'chat_id': ''
      //   }
      //   console.log(JSON.stringify(requestPyload));
  
      //   const id_token = getIdToken();
      //   const access_token = getAccessToken();
      //   const response = await fetch(`https://gcdzehfy8c.execute-api.ap-southeast-1.amazonaws.com/chat-stage/chat`, {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'id_token': `${id_token}`,
      //       'Authorization' : `Bareer ${access_token}`,
      //     },
      //     body: JSON.stringify(requestPyload),
      //   });
      //   console.log(response.ok);
      //   const data = await response.json(); // Sesuaikan tipe response jika perlu
      //   console.log('Response:', data);
    
      //   return data; // Mengembalikan data chat dan pesan
      // } catch (error) {
      //   console.error('Error', error);
      //   return null; // Bisa mengembalikan null atau objek error sesuai dengan kebijakan aplikasi
      // }
      try {
          const requestPyload = {
               'prompt': message,
               'chat_id': ''
          }
          const response = await fetch('https://gcdzehfy8c.execute-api.ap-southeast-1.amazonaws.com/chat-stage/chat', {
            method: 'POST',
            headers: getHeaders(),
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
    setRecentPrompt(input);
    
  
    sendMessage(input).then((response) => {
      if (!response) {
        // Menangani kasus jika response adalah null atau undefined
        console.error('Response is null or undefined');
        return; // Keluar dari fungsi jika tidak ada response
      }
      if (!chatId) {
        setChats([response.chat, ...chats]);
      }
      console.log(chats);
      setChatId(response.chat.id); // Update chatId di Zustand
      setMessage([...messages, newMessage, response.message]); // Update messages di Zustand
      scrollToBottom(); // Scroll setelah pesan dikirim
    });
  };
  return (
    <div className="main">
			<div className="nav">
      <div className="top item-center">
				<div className="new-chat">
					{/* <img src={logo} alt="" onClick={()=>{
                        newChat()
                    }} />
					<p>New Chat</p> */}
				</div>
			</div>
				<img src={logo} alt="" />
			</div>
      <div></div>
			<div className="main-container">
				{!showResults ? (
					<>
						<div className="greet text-blue-600">
							{/* <p>
								<span>Hello , {surveyData?.username} </span>
							</p>
							<p>Hello {surveyData?.username}, How Can i Help You Today?</p> */}
            <img src={logo1} alt="gambar"/>
						</div>
						<div className="cards">
							<div
								className="card"
								onClick={() =>
									handleCardClick("What is the first step I should take to study abroad?")
								}
							>
								<p>What is the first step I should take to study abroad?</p>
								<img src={assets.compass_icon} alt="" />
							</div>
							<div
								className="card"
								onClick={() =>
									handleCardClick(
										"Which universities are the best for my chosen field of study?"
									)
								}
							>
								<p>Which universities are the best for my chosen field of study?</p>
								<img src={assets.message_icon} alt="" />
							</div>
							<div
								className="card"
								onClick={() =>
									handleCardClick("Do I need TOEFL, IELTS, or any other certifications?")
								}
							>
								<p>Do I need TOEFL, IELTS, or any other certifications?</p>
								<img src={assets.bulb_icon} alt="" />
							</div>
							<div
								className="card"
								onClick={() => {
									handleCardClick(
										"How can I write a good personal statement or motivation letter? "
									);
								}}
							>
								<p>How can I write a good personal statement or motivation letter? </p>
								<img src={assets.code_icon} alt="" />
							</div>
						</div>
					</>
				) : (
					<div className="result">
						{/* <div className="result-title">
							<img src={assets.user} alt="" />
							<p>{recentPrompt}</p>
						</div> */}
						<div className="result-data">
                <ChatMessages messages={messages} />
                <div ref={messagesEndRef} />
						</div>
					</div>
				)}
        <ChatInputcopy onSendMessage={handleSendMessage} ref={inputFieldRef} />
			</div>
		</div>
  );
}
