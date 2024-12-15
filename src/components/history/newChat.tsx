import { useRef } from "react";
import { useChatStore } from "./store";
import { NavItem } from "./NavItem";

export function NewChat(){
    const {chatId, setChatId, setMessages} = useChatStore();
    const inputFieldRef = useRef<HTMLInputElement | null>(null);
    const newChat = () => {
        setChatId(null);
        console.log(setChatId);
        setMessages([]);
        console.log(setMessages);
        inputFieldRef?.current?.focus();
        console.info('gagal')
      };

      return(
        <NavItem active={!chatId} onClick={() => newChat()}>
            <div className="bg-[#1a1f2e]"></div>
        </NavItem>
      );
}