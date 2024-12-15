import create from 'zustand';
import React from 'react';


interface Message {
    id?: string;  // Optional ID
    role: "user" | "bot";
    text?: string;  // Tambahkan text sebagai opsional
    content: {
      text: string;
    }[];
}
  
interface ChatStore {
  showResults: boolean;
  setShowResults: (show: boolean) => void;
  input: string;
  setInput: (input: string) => void;
  resetInput: () => void;
  messages: Message[];
  chats: any[]; // Ubah tipe ini sesuai dengan struktur chat Anda
  chatId: string | null;
  setMessage: (newMessages: Message[]) => void;
  setChats: (chats: any[]) => void;
  setChatId: (chatId: string | null) => void;
  isInputFocused: boolean;
  setInputFocus: (isFocused: boolean) => void;
  inputFieldRef: React.RefObject<HTMLInputElement>;
  setInputFieldRef: (ref: React.RefObject<HTMLInputElement>) => void;
  messagesEndRef: React.RefObject<HTMLDivElement> | null;
  setMessagesEndRef: (ref: React.RefObject<HTMLDivElement> | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  recentPrompt: string;
  setRecentPrompt: (prompt: string) => void;
  resultData: string;
  setResultData: (data: string) => void;
}

interface SuggestionStore {
    suggestions: string[];
    removeSuggestion: (suggestion: string) => void;
    clearSuggestions: () => void;
} 

const suggestionsList = [
    "What can I ask you to do?",
    "Which one of my projects is performing the best?",
    "What projects should I be concerned about right now?",
];


export const useChatStore = create<ChatStore>((set) => ({
  input: '',
  suggestions: [],
  setInput: (input) => set({ input }),
  resetInput: () => set({ input: '' }),
  messages: [],
  chats: [],
  chatId: null,
  setMessage: (newMessages) => set({ messages: newMessages }),
  setChats: (chats) => set({ chats }),
  setChatId: (chatId) => set({ chatId }),
  // State untuk fokus input
  isInputFocused: false,
  setInputFocus: (isFocused: boolean) => set({ isInputFocused: isFocused }),
  inputFieldRef: React.createRef<HTMLInputElement>(),
  messagesEndRef: null,
  setInputFieldRef: (ref) => set({ inputFieldRef: ref }),
  setMessagesEndRef: (ref: React.RefObject<HTMLDivElement> | null) => set({ messagesEndRef: ref }),
  showResults: false,  // Nilai awal
  setShowResults: (show) => set({ showResults: show }),
  loading: false,  // Nilai default
  setLoading: (loading) => set({ loading }), 
  recentPrompt: "",
  setRecentPrompt: (prompt: string) => set({ recentPrompt: prompt }),
  resultData: '',  // Nilai default
  setResultData: (data: string) => set({ resultData: data }),
}));

export const useSuggestionStore = create<SuggestionStore>((set) => ({
    suggestions: suggestionsList,
    inputValue: "",
    removeSuggestion: (suggestion) =>
      set((state) => ({
        suggestions: state.suggestions.filter((item) => item !== suggestion),
      })),
    clearSuggestions: () => set({ suggestions: [] }),
  }));
  