import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import {
  Avatar,
  Box,
  Button,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { getChats } from "../../config/apiCalls";
import { getSender } from "../../utils/util";
import { AddIcon } from "@chakra-ui/icons";
import { ChatLoading } from "./ChatLoading";
import GroupChatModal from "./GroupChatModal";

const MyChats = ({fetchAgain}) => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, setUser, chats, setChats, selectedChat, setSelectedChat } =
    ChatState();
  const toast = useToast();
  window.stt = selectedChat;
  const fetchChats = async () => {
    try {
      let chats = await getChats();
      console.log("all chats are", chats);
      setChats(chats);
    } catch (error) {
      toast({
        title: "Error in fetching the chats",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    console.log("selectec chat", selectedChat);
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      alignItems={"center"}
      p={3}
      bg={"white"}
      flexDirection={"column"}
      w={{ base: "100%", md: "30%" }}
      borderRadius={"lg"}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "15px", md: "20px" }}
        fontFamily={"work sans"}
        display={"flex"}
        justifyContent={"space-between"}
        w={"100%"}
        alignItems={"center"}
      >
        My Chats
        <GroupChatModal>

        <Button
          display={"flex"}
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          rightIcon={<AddIcon />}
          >
          New Group Chat
        </Button>
            </GroupChatModal>
      </Box>

      <Box
        display={"flex"}
        p={3}
        bg={"#F8F8F8"}
        w={"100%"}
        h={"100%"}
        borderRadius={"lg"}
        overflowY={"hidden"}
      >
        {chats?.length>0 ? (
          <Stack overflowY={"scroll"} w={"100%"}>
            {chats?.map((item) => {
              return (
                <Box
                  borderRadius={"lg"}
                  w={"100%"}
                  onClick={() => setSelectedChat(item)}
                  cursor={"pointer"}
                  bg={selectedChat === item ? "#38B2AC" : "#E8E8E8"}
                  color={selectedChat === item ? "white" : "black"}
                  px={3}
                  py={2}
                  display={"flex"}
                  alignItems={"center"}
                >
                  <Avatar src={getSender(user._id, item.users)?.pic} />
                  <Text mx={2}>
                    {item.isGroupChat
                      ? item.name
                      : getSender(user._id, item.users).username}
                  </Text>
                </Box>
              );
            })}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
