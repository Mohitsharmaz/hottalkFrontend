import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { appConfig } from "../../config";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../context/ChatProvider";


const Login = () => {
const {setUser} = ChatState()
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate =useNavigate()

  const submitHanlder = async() => {
    setLoading(true);
    if (!password || !name) {
      toast({
        title: "Invalid Credentials",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        appConfig.login,
        { username: name, password },
        config
      );

      toast({
        title: "Logged In",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data))
      setUser(data)
      setLoading(false);
      console.log("loggged in data is", data);
      navigate("/chats")
    } catch (error) {
      toast({
        title: "Invalid details",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  return (
    <VStack spacing={"5px"}>
      <FormControl id="Username" isRequired>
        <FormLabel>Username</FormLabel>
        <Input
          placeholder="Enter A Username"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type="password"
            placeholder="Enter A Username"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <InputRightElement>
            <Button
              h={"1.75rem"}
              px={"2rem"}
              mr={"3rem"}
              size={"sm"}
              onClick={() => setShow(!show)}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width={"100%"}
        onClick={submitHanlder}
        style={{ marginTop: 15 }}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
