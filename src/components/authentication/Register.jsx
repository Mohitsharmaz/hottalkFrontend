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
import React, { useState } from "react";
import axios from "axios";
import { appConfig } from "../../config";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const postDetails = (pic) => {
    console.log("uploading image ", pic);
    setLoading(true);
    if (pic === undefined) {
      toast({
        title: "please select an image",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pic.type === "image/jpg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "hottalk");
      data.append("cloud_name", "ddxbs1roh");

      fetch("https://api.cloudinary.com/v1_1/ddxbs1roh/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => {
          res.json();
        })
        .then((data) => {
          setPic(data?.url?.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log("error", err);
          setLoading(false);
        });
    } else {
      toast({
        title: "please select an image",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const submitHanlder = async () => {
    setLoading(true);

    if (!name || !email || !confirmpassword || !password) {
      toast({
        title: "please fill all the fields",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }

    if (password !== confirmpassword) {
      toast({
        title: "Passwords do not match",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = axios.post(
        appConfig.register,
        {
          username: name,
          email,
          password,
          pic,
        },
        config
      );

      toast({
        title: "Registration Successfull",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/chats");
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error occured",
        description: error?.response?.data?.message,
        status: "error",
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

      <FormControl id="Email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Email"
          onChange={(e) => {
            setEmail(e.target.value);
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

      <FormControl id="confirmpassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type="password"
            placeholder="Confirm Your Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
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

      <FormControl id="pic" isRequired>
        <FormLabel>Avatar</FormLabel>
        <Input
          type="file"
          placeholder=""
          onChange={(e) => {
            postDetails(e.target.files[0]);
          }}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width={"100%"}
        onClick={submitHanlder}
        style={{ marginTop: 15 }}
        isLoading={loading}
      >
        Register
      </Button>
    </VStack>
  );
};

export default Register;
