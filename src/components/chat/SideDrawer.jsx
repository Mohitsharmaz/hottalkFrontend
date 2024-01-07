import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import ProfileModal from "../ProfileModal";
import { useNavigate } from "react-router-dom";
import { accessChat, getUsers } from "../../config/apiCalls";
import { ChatLoading } from "./ChatLoading";
import UserListItem from "./UserListItem";

const SideDrawer = () => {
  const { user, setSelectedChat, chats, setChats, notification } = ChatState();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();

  const logOutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const searchHanlder = async () => {
    setLoading(true);
    if (!search) {
      toast({
        title: "Please enter email or username to search",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
      setSearchResults([]);
      setLoading(false);
    }
    let users = await getUsers(search);
    console.log("users ", users);
    setSearchResults(users);
    setLoading(false);
  };

  const accessChatFunc = async (id) => {
    try {
      setLoadingChat(true);
      let chat = await accessChat(id);
      console.log("chat is here", chat);
      setSelectedChat(chat);

      let exists = chats.find((item) => item._id === chat._id);
      if (!exists) {
        setChats([...chats, chat]);
      }
      console.log("all chats are", chats)
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: error.message,
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
      setLoadingChat(false);
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        bg={"white"}
        w={"100%"}
        p={"5px 10px"}
        //    borderWidth={"5px"}
      >
        <Tooltip label="Search users to chat" hasArrow placement="bottom-end">
          <Button variant={"ghost"} onClick={onOpen}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <Text
              display={{ base: "none", md: "flex" }}
              alignItems={"center"}
              px={"4"}
            >
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text>Hot Talks</Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize={"2xl"} m={1} />
              <Text fontSize={'10px'} color={'white'} position={'absolute'} bg={'red'} p={1} borderRadius={"100rem"} top={0}>{notification.length}</Text>
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton p={1} as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size={"sm"}
                cursor={"pointer"}
                name={user.username}
                src={user?.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logOutHandler}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer
        placement="left"
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
      >
        {/* <Text>Hello</Text> */}
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader>Search User</DrawerHeader>
            <DrawerBody>
              <Box display={"flex"} pb={2}>
                <Input
                  name="search by name or email"
                  mr={2}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={searchHanlder}>Go</Button>
              </Box>
              <Box>
                {!loading ? (
                  searchResults.length > 0 ? (
                    searchResults.map((item) => {
                      return (
                        <UserListItem
                          key={item._id}
                          user={item}
                          handleFunction={() => accessChatFunc(item._id)}
                        />
                      );
                    })
                  ) : (
                    <Box mt={1} p={3}>
                      <Text>No User Found</Text>
                    </Box>
                  )
                ) : (
                  <ChatLoading />
                )}
              </Box>
              {loadingChat && (
                <Spinner
                  ml={"auto"}
                  alignSelf={"center"}
                  m={2}
                  display={"flex"}
                />
              )}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default SideDrawer;
