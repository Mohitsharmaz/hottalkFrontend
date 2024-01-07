import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { appConfig } from "../config";
import { ChatState } from "../context/ChatProvider";
import SideDrawer from "../components/chat/SideDrawer";
import { Box } from "@chakra-ui/react";
import MyChats from "../components/chat/MyChats";
import ChatBox from "../components/chat/ChatBox";

const Chatpage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false)

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box display={'flex'} justifyContent={"space-between"} w={"100%"} h={"91.5vh"} p={"10px"}>
        {user && <MyChats fetchAgain setFetchAgain/>}
        {user && <ChatBox fetchAgain setFetchAgain />}
      </Box>
    </div>
  );
};

export default Chatpage;
