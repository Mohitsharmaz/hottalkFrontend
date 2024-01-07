import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  useDisclosure,
  Button,
  Avatar,
  Image,
  Text,
  Input,
  FormControl,
  useToast,
  Tag,
  Box,
  TagCloseButton,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { createGroupChat, getUsers } from "../../config/apiCalls";
import UserListItem from "./UserListItem";

const GroupChatModal = ({ children }) => {
  const { user, chats, setChats } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [chatName, setChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSearch = async (e) => {
    try {
      let users = await getUsers(e);
      setSearch(users);
    } catch (error) {}
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      let chat = await createGroupChat({
        name: chatName,
        userId: selectedUsers.map((item) => {
          return item._id;
        }),
      });
      console.log("chat is here", chat);
      if (chat) {
        setChats([chat, ...chats]);
      } else {
        toast({
          title: "Error In Creating the group chat",
          status: "warning",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
      setLoading(false);
      onClose();
    } catch (error) {
      console.log("got error adding group", error);
    }
  };
  window.stt = selectedUsers;

  const addUser = (user) => {
    if (selectedUsers?.includes(user)) {
      toast({
        title: "User Already Added",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setSelectedUsers([...selectedUsers, user]);
  };
  const removeUser = (user) => {
    let tempUsers = selectedUsers.filter((item) => item._id !== user._id);
    setSelectedUsers(tempUsers);
  };
  return (
    <>
      <div onClick={onOpen}>{children}</div>
      <>
        <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
              fontSize={"20px"}
              fontFamily={"work sans"}
              display={"flex"}
              justifyContent={"center"}
            >
              {/* {user.username} */}
              Create Group Chat
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody
              display={"flex"}
              alignItems="center"
              flexDirection={"column"}
            >
              {/* <Text fontSize={"2em"}>hello groups</Text>*/}
              <FormControl>
                <Input
                  type="text"
                  mb={3}
                  placeholder="Chat Name"
                  onChange={(e) => setChatName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Input
                  placeholder="Search Users"
                  type="select"
                  mb={3}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </FormControl>
              {/* selected users */}
              {/* render searched users */}
              {selectedUsers ? (
                <Box display="flex" justifyContent="flex-start" w={"100%"}>
                  {selectedUsers?.map((it) => {
                    return (
                      <Tag
                        size={"lg"}
                        key={it._id}
                        borderRadius="full"
                        variant="solid"
                        colorScheme="purple"
                        m={2}
                      >
                        {it.username}
                        <TagCloseButton onClick={() => removeUser(it)} />
                      </Tag>
                    );
                  })}
                </Box>
              ) : (
                "no user selected"
              )}

              {search.length > 0
                ? search?.map((item) => {
                    return (
                      <UserListItem
                        user={item}
                        handleFunction={() => addUser(item)}
                      />
                    );
                  })
                : ""}
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={handleSubmit}
                isLoading={loading}
              >
                Create Chat
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </>
  );
};

export default GroupChatModal;
