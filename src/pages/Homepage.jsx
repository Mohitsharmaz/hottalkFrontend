import React, { useContext, useEffect } from "react";
import {
  Container,
  Box,
  Text,
  TabList,
  Tab,
  TabPanels,
  Tabs,
  TabPanel,
} from "@chakra-ui/react";
import Login from "../components/authentication/Login";
import Register from "../components/authentication/Register";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      navigate("/chats");
    }
  });
  return (
    <Container maxW={"xl"} centerContent>
      <Box
        d="flex"
        p={"3"}
        textAlign={"center"}
        justifyContent={"center"}
        bg={"white"}
        w={"100%"}
        m={"40px 0 15px 0"}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Text fontSize={"2xl"} fontFamily={"work sans"}>
          Hot Talks
        </Text>
      </Box>
      <Box
        p={"4"}
        bg={"white"}
        w={"100%"}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Tabs variant="soft-rounded">
          <TabList mb={"1em"}>
            <Tab w={"50%"}>Login</Tab>
            <Tab w={"50%"}>Register</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Register />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
