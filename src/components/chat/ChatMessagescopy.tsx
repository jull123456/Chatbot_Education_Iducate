import React from 'react';
// import { useChatStore } from './store';
// import { assets } from './assets/assets';
import './main.css'
import logo1 from './profile.png';
import logo2 from './robot-assistant.png';


interface ChatBubbleProps {
  role: 'user' | 'bot';
  content: string;
}

// const ChatBubble = ({role, content }: ChatBubbleProps) => {
//   return (
//     <div className="result">
// 						<div className="result-title">
// 							<img src={assets.user} alt="" />
// 							<p>{content}</p>
// 						</div>
// 			</div>
//   );
// };

const ChatBubble = ({ role, content }: ChatBubbleProps) => {
  return (
    <div className={`${role === 'user' ? 'col-start-1 col-end-8' : 'col-start-5 col-end-13'} p-2 rounded-lg`}>
      <div className={`flex gap-2  ${role === 'user' ? 'flex-row' : 'flex-row-reverse'} items-center`}>
        <div className={`flex items-center justify-center h-10 w-10 rounded-full ${role === 'user' ? 'bg-indigo-300' : 'bg-indigo-500'} flex-shrink-0`}>
        {role === 'user' ? <img src={logo1} alt="" /> : <img src={logo2} alt="" />}
        </div>
        <div className={`relative ${role === 'user' ? 'ml-2' : 'mr-2'} text-sm ${role === 'user' ? 'bg-white dark:bg-cyan-900' : 'bg-white dark:bg-sky-900'} p-3 shadow rounded-xl`}>
          <span className={`whitespace-pre-wrap ${role === 'user' ? 'text-black dark:text-white' : 'text-black dark:text-white'}`}>
          <p dangerouslySetInnerHTML={{ __html: content }}></p>
          </span>
        </div>
      </div>
    </div>
  );
};

interface ChatMessagesProps {
  messages: { role: 'user' | 'bot'; content: { text: string }[] }[];
}

export const ChatMessages = ({ messages }: ChatMessagesProps) => {
  console.log(messages);
  return (
    <div className="grid grid-cols-8 gap-4 px-2 mb-6">
      {messages.map((message, index) => (
        <ChatBubble
          key={index}
          role={message.role}
          content={message.content.map((block) => block.text).join('\n')}
        />
      ))}
    </div>
  );
};
