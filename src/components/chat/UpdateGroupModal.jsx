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
import {
  addUser,
  createGroupChat,
  getUsers,
  removeUser,
  updateChatName,
} from "../../config/apiCalls";
import UserListItem from "./UserListItem";
import { ViewIcon } from "@chakra-ui/icons";

const UpdateGroupModal = ({ children,fetchAllMessages }) => {
  const { user, chats, setChats, selectedChat } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [chatName, setChatName] = useState(selectedChat.name);
  const [selectedUsers, setSelectedUsers] = useState(selectedChat.users);
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

  const handleRemove = async () => {
    console.log("exiting from group");
  };

  const updateName = async () => {
    const name = await updateChatName({
      userId: selectedChat._id,
      name: chatName,
    });
    console.log("exiting from group");
  };

  const addUserFunc = async (user) => {
    let added =await addUser({ chatId: selectedChat._id, userId: user._id });
    setSelectedUsers([...selectedUsers, user]);
    fetchAllMessages()
  };

  const removeUserFunc = async(user) => {
    let added =await removeUser({ chatId: selectedChat._id, userId: user._id });
    let tempUsers = selectedUsers.filter((item) => item._id !== user._id);
    setSelectedUsers(tempUsers);
    fetchAllMessages()
  };
  return (
    <>
      {/* <div onClick={onOpen}>{children}</div> */}
      <IconButton
        display={{ base: "flex" }}
        icon={<ViewIcon />}
        onClick={onOpen}
      />
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
              {selectedChat?.name}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody
              display={"flex"}
              alignItems="center"
              flexDirection={"column"}
            >
              {/* <Text fontSize={"2em"}>hello groups</Text>*/}
              <FormControl display={"flex"}>
                <Input
                  type="text"
                  value={chatName}
                  mb={3}
                  placeholder="Chat Name"
                  onChange={(e) => setChatName(e.target.value)}
                />
                <Button
                  colorScheme="purple"
                  //   mr={3}
                  ml={2}
                  onClick={updateName}
                  isLoading={loading}
                >
                  Update
                </Button>
              </FormControl>
              {selectedChat?.groupAdmin?._id === user._id && (
                <FormControl>
                  <Input
                    placeholder="Search Users"
                    type="select"
                    mb={3}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </FormControl>
              )}
              {/* selected users */}
              {/* render searched users */}

              {selectedUsers ? (
                <Box display="flex" justifyContent="flex-start" w={"100%"}>
                  {selectedUsers.map((it) => {
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
                        {selectedChat?.groupAdmin?._id === user._id && (
                          <TagCloseButton onClick={() => removeUserFunc(it)} />
                        )}
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
                        handleFunction={() => addUserFunc(item)}
                      />
                    );
                  })
                : ""}
            </ModalBody>

            <ModalFooter display={"flex"} justifyContent={"space-between"}>
              {/* <Button
                colorScheme="blue"
                mr={3}
                onClick={handleSubmit}
                isLoading={loading}
              >
                Update Group
              </Button> */}
              <Button
                colorScheme="red"
                mr={3}
                onClick={handleRemove}
                isLoading={loading}
              >
                Leave
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </>
  );
};

export default UpdateGroupModal;
