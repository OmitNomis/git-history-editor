import { Box, Container, Flex, Icon, Text } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <Box as="footer" bg="gray.800" color="white" py="6">
      <Container maxW="container.xl">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ base: "column", md: "row" }}
          gap={6}>
          <Flex flex={1} alignItems={"center"} justifyContent={"flex-start"}>
            <Text>© 2023 GitRevise</Text>
          </Flex>
          <Flex flex={1} alignItems={"center"} justifyContent={"center"}>
            <Icon
              onClick={() => {
                window.open("https://github.com/OmitNomis");
              }}
              cursor={"pointer"}
              as={FaGithub}
              boxSize={6}
            />
          </Flex>
          <Flex flex={1} justifyContent={"flex-end"}>
            <Text mt={2}>Made with ❤️ by OmitNomis</Text>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
