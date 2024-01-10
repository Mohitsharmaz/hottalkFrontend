import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
//   const navigate = useNavigate();
  const [user, setUser] = useState();
  const [selectedChat , setSelectedChat] = useState()
  const [chats, setChats] = useState()
  const [notification, setNotification] = useState([])
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo")
    if(userInfo)
    setUser(JSON?.parse(userInfo));
    // if (!userInfo) {
    //   navigate("/");
    // }
  }, []);

  useEffect(()=>{
    console.log("latest is", selectedChat)
  },[selectedChat])
  return (
    <ChatContext.Provider value={{ user, setUser, chats, setChats,selectedChat, setSelectedChat , notification, setNotification }}>
      {children}
    </ChatContext.Provider>
  );
};
export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
