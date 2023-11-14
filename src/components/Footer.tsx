import { Box, Container, Flex, Icon, Text } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <Box as="footer" bg="gray.800" color="white" py="6">
      <Container maxW="container.lg">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ base: "column", md: "row" }}
          gap={6}>
          <Text>© 2023 GitRevise</Text>
          <Icon
            onClick={() => {
              window.open("https://github.com/OmitNomis");
            }}
            cursor={"pointer"}
            as={FaGithub}
            boxSize={6}
          />
          <Text mt={2}>Made with ❤️ by OmitNomis</Text>
        </Flex>
      </Container>
    </Box>
  );
};
