import { Box, Container, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { FaCodeBranch } from "react-icons/fa";

export const Header = () => {
  return (
    <Box
      bgGradient="linear(to-r, gray.900, gray.800)"
      color="white"
      py={{ base: 8, md: 12 }}
      borderBottom="4px solid"
      borderColor="brand.500">
      <Container maxW="container.xl">
        <Flex align="center" gap={4}>
          <Flex
            align="center"
            justify="center"
            boxSize={{ base: 12, md: 14 }}
            bg="brand.500"
            rounded="xl"
            flexShrink={0}>
            <Icon as={FaCodeBranch} boxSize={{ base: 6, md: 7 }} />
          </Flex>
          <Box>
            <Heading as="h1" size={{ base: "xl", md: "2xl" }} lineHeight={1.1}>
              GitRevise
            </Heading>
            <Text color="gray.300" mt={1} fontSize={{ base: "sm", md: "md" }}>
              Edit your commit history, right in the browser.
            </Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
