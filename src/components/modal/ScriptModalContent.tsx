import { FC } from "react";
import { ScriptModalContentProps } from "../../types/App.types";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Text,
  Flex,
  Code,
  Button,
} from "@chakra-ui/react";
import { FaCopy } from "react-icons/fa";
import { WarningContent } from "../WarningContent";

export const ScriptModalContent: FC<ScriptModalContentProps> = ({ script }) => {
  const handleCodeCopy = () => {
    navigator.clipboard.writeText(script);
  };

  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Script</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflow={"hidden"}>
          <Flex flexDir={"column"} pb={5}>
            <Text>
              Paste the following script into your terminal to apply your
              changes:
            </Text>
            <Code
              mt={2}
              p={2}
              borderRadius={5}
              bg={"gray.100"}
              overflow={"scroll"}
              maxH={"md"}>
              <Box as="pre">{script}</Box>
            </Code>
            <Flex my={4} justifyContent={"center"}>
              <Button
                bg="gray.800"
                color="white"
                onClick={handleCodeCopy}
                leftIcon={<FaCopy />}
                w={"full"}>
                Copy Script
              </Button>
            </Flex>
            <WarningContent />
          </Flex>
        </ModalBody>
      </ModalContent>
    </>
  );
};
