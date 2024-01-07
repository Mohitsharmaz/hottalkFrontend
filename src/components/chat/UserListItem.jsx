import React from "react";
import { Avatar, Box, Text } from "@chakra-ui/react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor={"pointer"}
      bg={"#E8E8E8"}
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w={"100%"}
      alignItems={"center"}
      display={"flex"}
      p={1}
      borderRadius={"5px"}
      mt={2}
      // justifyContent={"space-between"}
    >
      <Avatar size={"md"} src={user?.pic} />
      <Text>{user.username}</Text>
    </Box>
  );
};

export default UserListItem;
