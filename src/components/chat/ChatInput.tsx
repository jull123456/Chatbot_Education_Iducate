import React, { forwardRef, useEffect, useRef} from 'react';
import { useChatStore, useSuggestionStore } from './store';  // Import Zustand store
import { ConeIcon, Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (input: string) => void;
}

// Gunakan forwardRef dengan tipe yang benar
export const ChatInput = forwardRef<HTMLInputElement, ChatInputProps>(({ onSendMessage }, ref) => {
  const input = useChatStore((state) => state.input);
  const setInput = useChatStore((state) => state.setInput);
  const resetInput = useChatStore((state) => state.resetInput);
  const {clearSuggestions} = useSuggestionStore();
  const {setChats} = useChatStore();

  

  const handleSendMessage = () => {
    console.log("inputnya "+input)
    clearSuggestions();
    if (input.trim() === '') {
      return;
    }
    onSendMessage(input);
    resetInput(); // Reset input setelah mengirim pesan
  };


  return (
       <div className="relative">
       <input
         ref={ref}
         type="text"
         value={input}
         onChange={(e) => setInput(e.target.value)}
         placeholder="Ask me anything about your projects"
         className="w-full bg-white/10 text-white placeholder-white/70 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-white/30"
       />
       <button 
        type="submit"
        onClick={handleSendMessage}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-white/80 transition-colors">
         <Send className="w-5 h-5" />
       </button>
     </div>
  );
});
