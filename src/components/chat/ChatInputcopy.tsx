import React, { forwardRef} from 'react';
import { useChatStore, useSuggestionStore } from './store';  // Import Zustand store
// import { ConeIcon, Send } from 'lucide-react';
import { assets } from './assets/assets';
import './main.css';


// Gunakan forwardRef dengan tipe yang benar
export const ChatInputcopy = forwardRef<HTMLInputElement, ChatInputProps>(({ onSendMessage }, ref) => {
  const input = useChatStore((state) => state.input);
  const setInput = useChatStore((state) => state.setInput);
  const resetInput = useChatStore((state) => state.resetInput);
  const {clearSuggestions} = useSuggestionStore();
  // const {setChats} = useChatStore();
  const {setShowResults} = useChatStore();

  

  const handleSendMessage = () => {
    setShowResults(true);
    console.log("inputnya "+input)
    clearSuggestions();
    if (input.trim() === '') {
      return;
    }
    onSendMessage(input);
    resetInput(); // Reset input setelah mengirim pesan
  };


  return (
        <div className="main-bottom">
          <div className="search-box">
            <input
              ref={ref}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              value={input}
              type="text"
              placeholder="Enter the Prompt Here"
            />
            <div>
              <img
                src={assets.send_icon}
                alt=""
                onClick={handleSendMessage}
              />
            </div>
          </div>
          <div className="bottom-info">
            <p>
              Iducate may display inaccurate info, including about people, so
              double-check its responses. Your privacy & Iducate Apps
            </p>
          </div>
        </div>
  );
});
