import { useState, useCallback } from 'react';
import { Message, ChatState } from '../types/chat';

export function useChat() {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isTyping: false,
  });

  const sendMessage = useCallback((content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isTyping: true,
    }));

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I am a simulated AI response to: "${content}"`,
        role: 'assistant',
        timestamp: new Date(),
      };

      setState((prev) => ({
        messages: [...prev.messages, assistantMessage],
        isTyping: false,
      }));
    }, 1000);
  }, []);

  return {
    messages: state.messages,
    isTyping: state.isTyping,
    sendMessage,
  };
}