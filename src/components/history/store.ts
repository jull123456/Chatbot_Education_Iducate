import create from 'zustand';

// Definisikan tipe data untuk 'Message'
interface Message {
  role: 'user' | 'bot';
  content: { text: string }[];
}

// Definisikan tipe data untuk 'Chat'
interface Chat {
  id: number;
  title: string;
}

// Definisikan tipe untuk state chat
interface ChatState {
  chats: Chat[];
  chatId: number | null;
  messages: Message[];
  drawerOpen: boolean;
  inputFieldRef: React.RefObject<HTMLInputElement | null>;  // Menambahkan inputFieldRef ke dalam state
  setChats: (chats: Chat[]) => void;
  setChatId: (chatId: number | null) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (newMessage: Message) => void;
  setDrawerOpen: (open: boolean) => void;
  setInputFieldRef: (ref: React.RefObject<HTMLInputElement | null>) => void;  // Menambahkan fungsi untuk set inputFieldRef
}

// Buat store dengan Zustand
export const useChatStore = create<ChatState>((set) => ({
  chats: [],
  chatId: null,
  messages: [],
  drawerOpen: false,
  inputFieldRef: { current: null },  // Inisialisasi dengan ref kosong
  setChats: (chats) => set({ chats }),
  setChatId: (chatId) => set({ chatId }),
  setMessages: (messages) => set({ messages }),
  addMessage: (message: Message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setDrawerOpen: (open) => set({ drawerOpen: open }),
  setInputFieldRef: (ref) => set({ inputFieldRef: ref }),  // Fungsi untuk set inputFieldRef
}));
