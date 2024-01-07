import React from "react";
import { ChatState } from "../../context/ChatProvider";
import { Box } from "@chakra-ui/react";
import { getSender } from "../../utils/util";
import SingleChat from "./SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, user } = ChatState();
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems={"center"}
      flexDirection={"column"}
      
      w={{ base: "100%", md: "68%" }}
      bg={"white"}
      borderRadius={"lg"}
    >
      {/* {getSender(user._id,selectedChat?.users)?.username} */}
      <SingleChat fetchAgain setFetchAgain />
    </Box>
  );
};

export default ChatBox;
