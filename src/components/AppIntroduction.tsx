import { useState, FC } from 'react'
import { Box, Button, Code, Flex, Heading, Text, Input } from "@chakra-ui/react";
import { FaCopy, FaDownload } from "react-icons/fa";


interface AppIntroductionProps {
    handleImport: (output: string) => void;
}

export const AppIntroduction: FC<AppIntroductionProps> = ({ handleImport }) => {

    const [consoleOutput, setConsoleOutput] = useState<string>("");

    const handleCodeCopy = () => {
        const gitLogCommand = 'git log -100 --pretty=format:"%H*#%an*#%ae*#%at*#%s" | base64 | tr -d "\n"';
        navigator.clipboard.writeText(gitLogCommand);
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleImport(consoleOutput);
    }

    return (
        <Flex flexDir="column" gap={8} as={'section'}>
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
                    <Button bg="gray.800" color="white" onClick={handleCodeCopy} leftIcon={<FaCopy />} px={10} mr={10}
                    >
                        Copy
                    </Button>

                    <Code
                        colorScheme="gray"
                        overflowX={"scroll"}
                        p={4}
                        whiteSpace="nowrap"
                        children={`git log -100 --pretty=format:"%H*#%an*#%ae*#%at*#%s" | base64 | tr -d "\n"`}

                    />
                </Flex>
                <Text color={"GrayText"} textAlign="center">
                    <i>(replace 100 with the number of commits you want to import)</i>
                </Text>
            </Box>
            <Box as="form" onSubmit={handleFormSubmit} mt={4}>
                <Box mb={5}>
                    <Heading size={"md"} mb={4}>
                        Import Git History
                    </Heading>
                    <Text>
                        Paste the Console Output below to import your Git history.
                    </Text>
                </Box>
                <Flex>
                    <Input
                        value={consoleOutput}
                        onChange={(event) => setConsoleOutput(event.target.value)}
                        placeholder="Paste Here"
                        variant={"flushed"}
                    />
                    <Button bg={"gray.800"} color="white" type="submit" leftIcon={<FaDownload />} px={10} ml={10}>
                        Import
                    </Button>
                </Flex>
            </Box>
        </Flex>
    );
}
