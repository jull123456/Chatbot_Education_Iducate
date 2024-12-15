interface Message {
    role: "user" | "bot";
    content: { text: string }[];
  }
  
  interface MessageContent {
    text: string;
  }
  
  interface Message {
    role: 'user' | 'bot'; // Sesuaikan dengan tipe yang sesuai (misalnya 'user' atau 'bot')
    content: MessageContent[];
  }
  
  interface ChatMessagesProps {
    messages: Message[]; // Array dari objek Message
  }
  
  interface ChatBubbleProps {
    role: 'user' | 'bot'; // Tentukan nilai yang mungkin untuk role (misalnya 'user' atau 'bot')
    content: string; // Konten pesan yang akan ditampilkan
  }
  
  
  // Tipe untuk props
  interface ChatInputProps {
    onSendMessage: (input: string) => void;
  }

  interface ChatMessage {
    id: number;
    message: string;
  }
  
  interface Chat {
    id: number;
    message: string;
    title: string;
    // tambahkan properti lain sesuai dengan struktur data chat yang ada
  }
  
  interface NavItemProps {
    children: React.ReactNode;
    active?: boolean;
    onClick: () => void;
  }
  
  interface DrawerBackdropProps {
    onClick: () => void;
  }