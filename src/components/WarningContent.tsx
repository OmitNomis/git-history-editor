import { Box, Code, Heading, Text } from "@chakra-ui/react";

export const WarningContent = () => {
  return (
    <Box p={{ base: 2, sm: 4 }} pt={4} bg={"red.200"} rounded={"md"}>
      <Heading textAlign={"center"} size={"lg"} mb={4}>
        Warning!
      </Heading>
      <Text color={"red.900"}>
        Modifying past commits rewrites commit history, creating new commits.
        This can disrupt collaborators who've built on original commits. Avoid
        changing pushed commits, especially in collaborative projects, to
        prevent issues. If necessary, use
        <Code mx={2} rounded={"sm"}>
          git push --force
        </Code>
        cautiously, ensuring you understand the consequences.
      </Text>
    </Box>
  );
};
