import { Box, Button, Code, Flex, Heading, Text } from "@chakra-ui/react";
import { FaCopy } from "react-icons/fa";

export default function AppIntroduction() {
    const handleClick = () => {
        const gitLogCommand = 'git log -100 --pretty=format:"%H*#%an*#%ae*#%at*#%s" | base64 | tr -d "\n"';
        navigator.clipboard.writeText(gitLogCommand);
    };

    return (
        <Flex flexDir="column" gap={8}>
            <Box>
                <Heading size="md" mb={4}>
                    Introduction
                </Heading>
                <Text>
                    Introducing CommitCraft: Your Git History Sculptor!
                </Text>
            </Box>
            <Box>
                <Heading mb={4} size="md">
                    What is CommitCraft?
                </Heading>
                <Text>
                    <strong>CommitCraft</strong> is your reliable Git history editor, a tool designed to give your project's past a professional polish. No magic wands, just seamless Git history editing at your fingertips.
                </Text>
            </Box>
            <Box>
                <Heading mb={4} size="md">
                    Why CommitCraft?
                </Heading>
                <Text>
                    Why settle for a messy Git history when you can have a clean slate? CommitCraft offers:
                </Text>
            </Box>
            <Box>
                <Text>
                    - <strong>Precise Authorship Editing:</strong> Fix incorrect names and emails attached to commits without a hassle.
                </Text>
                <Text>
                    - <strong>Clearer Commit Messages:</strong> Upgrade your commit messages for a more professional touch, enhancing project clarity.
                </Text>
                <Text>
                    - <strong>Time Management:</strong> Adjust commit timestamps to align with your project's timeline, ensuring a coherent history.
                </Text>
            </Box>
            <Box>
                <Heading mb={4} size="md">
                    How Does CommitCraft Work?
                </Heading>
                <Text>
                    Using CommitCraft is as easy as pie. Execute a command in your project directory, paste your git log output, and you're set to refine your Git history.
                </Text>
            </Box>
            <Box>
                <Flex alignItems="center" justifyContent={'space-between'}>
                    <Button bg="gray.800" color="white" onClick={handleClick} leftIcon={<FaCopy />} px={10} mr={10}
                    >
                        Copy
                    </Button>
                    <Code
                        colorScheme="gray"
                        overflowY={"scroll"}
                        p={4}
                        whiteSpace="nowrap"
                        scrollBehavior={"smooth"}
                        children={`git log -100 --pretty=format:"%H*#%an*#%ae*#%at*#%s" | base64 | tr -d "\n"`}

                    />
                </Flex>
            </Box>
        </Flex>
    );
}
