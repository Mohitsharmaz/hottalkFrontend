import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { Howl } from "howler";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender } from "../../utils/util";
import ProfileModal from "../ProfileModal";
import UpdateGroupModal from "./UpdateGroupModal";
import { allChatMessages, sendMessage } from "../../config/apiCalls";
import "../styles.css";
import ScrollableChat from "./ScrollableChat";
import { io } from "socket.io-client";

// import sound from '../../audio/notification.wav'

// const ENDPOINT = "http://localhost:8000";
const ENDPOINT = "https://hottalkapi.onrender.com"
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgin, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat, setNotification, notification } =
    ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessages, setNewMessages] = useState();
  const [typing, setTyping] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    fetchAllMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.emit("connected");
  }, [selectedChat]);

  const fetchAllMessages = async () => {
    try {
      setLoading(true);
      let allMessages = await allChatMessages({ chatId: selectedChat._id });
      setMessages(allMessages);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      setLoading(false);
    }
  };

  // function playSound() {
  // const audio = new Audio("../../audio/notification.wav");
  // var audioPro = audio.play();
  // }
  useEffect(() => {
    socket.on("message recieved", (newMsg) => {
      console.log("new messsage recieved", newMsg);
      if (newMsg.chat._id === selectedChat?._id) {
        setMessages([...messages, newMsg]);
      } else {
        console.log("notification.....");
        setNotification([...notification, newMsg]);
      }

      // socket.on('typing', selectedChat._id)

      // socket.on('stop typing', selectedChat._id)
    });
  });
  const sendMessageFunc = async (e) => {
    console.log("message sent");
    if (e.key === "Enter" && newMessages) {
      try {
        let message = await sendMessage({
          chatId: selectedChat._id,
          content: newMessages,
        });

        setMessages([...messages, message]);
        setNewMessages("");
        socket.emit("new message", message);
      } catch (error) {}
    }
  };
  const typingHandler = async (e) => {
    setNewMessages(e?.target?.value);
    // console.log("typing....");
    // socket.emit("typing", selectedChat._id);

    // socket.on('typing', selectedChat._id)

    // socket.on('stop typing', selectedChat._id)

    // typing indiator logic here
  };
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            p={3}
            w={"100%"}
            fontFamily={"work sans"}
            display={"flex"}
            justifyContent={{ base: "space-between" }}
            alignItems={"center"}
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user._id, selectedChat.users)?.username}
                <ProfileModal user={getSender(user._id, selectedChat?.users)} />
              </>
            ) : (
              <>
                {selectedChat.name.toUpperCase()}
                <UpdateGroupModal fetchAllMessages={fetchAllMessages} />
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Box
                h={"100%"}
                display="flex"
                justifyContent="center"
                alignItems={"center"}
              >
                <Spinner
                  size={"xl"}
                  h={20}
                  w={20}
                  alignSelf={"center"}
                  margin={"auto"}
                />
              </Box>
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
                {typing && <p>Typing....</p>}
              </div>
            )}
            <FormControl
              zIndex={2}
              isRequired
              mt={3}
              onKeyDown={sendMessageFunc}
            >
              <Input
                variant={"filled"}
                bg={"#E0E0E80"}
                placeholder="Enter a message....."
                onChange={typingHandler}
                value={newMessages}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          w={"100%"}
        >
          <Text fontSize={"1.2rem"}>Click on a chat to start chatting</Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
