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
} from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../context/ChatProvider";
import { ViewIcon } from "@chakra-ui/icons";

const ProfileModal = ({ user, children }) => {
  //   const { user } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}

      <>
        <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
              fontSize={"40px"}
              fontFamily={"work sans"}
              display={"flex"}
              justifyContent={"center"}
            >
              {user.username}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody
              display={"flex"}
              alignItems="center"
              flexDirection={"column"}
            >
              <Image
                borderRadius={"full"}
                src={user?.pic}
                boxSize={"150px"}
                alt={user.username}
              />
              <Text fontSize={"2em"}>{user.email}</Text>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </>
  );
};

export default ProfileModal;
