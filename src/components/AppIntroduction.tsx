import { useState, FC } from 'react'
import { Box, Button, Code, Flex, Heading, Text, Input, useToast } from "@chakra-ui/react";
import { FaCopy, FaDownload } from "react-icons/fa";
import { AppIntroductionProps } from '../types/App.types';
import { getSamplpeLog, getGitLogCommand, b64UnicodeDecoder } from '../helpers';
import { WarningContent } from './WarningContent';

export const AppIntroduction: FC<AppIntroductionProps> = ({ handleImport }) => {

    const [consoleOutput, setConsoleOutput] = useState<string>("");
    const toast = useToast();

    const handleCodeCopy = () => {

        try {
            const gitLogCommand = getGitLogCommand();
            navigator.clipboard.writeText(gitLogCommand);
            toast({
                title: "Copied to Clipboard!",
                status: "success",
                duration: 3000,
                position: "top-right",
                isClosable: true,
                variant: 'top-accent'
            })
        } catch {
            toast({
                title: "Error Occured!",
                description: "There was an error, please copy manually",
                status: "error",
                duration: 3000,
                position: "top-right",
                isClosable: true,
                variant: 'top-accent'
            })
        }
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let decodedOutput;
        const formattedConsoleOutput = consoleOutput.trim().replace(/\s+/g, '')
        try {
            decodedOutput = b64UnicodeDecoder(formattedConsoleOutput);
            handleImport(decodedOutput);
        } catch (error) {
            toast({
                title: "Invalid Input!",
                description: "Please paste a valid git log output.",
                status: "error",
                duration: 3000,
                position: "top-right",
                isClosable: true,
                variant: 'top-accent'
            })
            return;
        }
    }
    const onClickSample = async () => {
        try {
            let sampleLog = await getSamplpeLog();
            setConsoleOutput(sampleLog);
            toast({
                title: "Sample Generated!",
                status: "success",
                duration: 3000,
                position: "top-right",
                isClosable: true,
                variant: 'top-accent'
            })
        } catch {
            toast({
                title: "Error Occured!",
                description: "Please try again.",
                status: "error",
                duration: 3000,
                position: "top-right",
                isClosable: true,
                variant: 'top-accent'
            })
        }
    }

    return (
        <Flex flexDir="column" gap={8} as={'section'}>
            <Box>
                <Heading size="md" mb={4}>
                    Introduction
                </Heading>
                <Text>
                    Introducing GitRevise: Your Git History Sculptor!
                </Text>
            </Box>
            <Box>
                <Heading mb={4} size="md">
                    What is GitRevise?
                </Heading>
                <Text>
                    <strong>GitRevise</strong> is your reliable Git history editor, a tool designed to give your project's past a professional polish. No magic wands, just seamless Git history editing at your fingertips.
                </Text>
            </Box>
            <Box>
                <Heading mb={4} size="md">
                    Why GitRevise?
                </Heading>
                <Text>
                    Why settle for a messy Git history when you can have a clean slate? GitRevise offers:
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
                    How Does GitRevise Work?
                </Heading>
                <Text>
                    Using GitRevise is as easy as pie. Execute a command in your project directory, paste your git log output, and you're set to refine your Git history.
                </Text>
            </Box>
            <Box>
                <Flex alignItems="center" gap={10}>
                    <Button bg="gray.800" color="white" onClick={handleCodeCopy} leftIcon={<FaCopy />} px={10} mr={{ base: 2, md: 8 }}
                    >
                        Copy
                    </Button>
                    <Code
                        colorScheme="gray"
                        overflowX={"scroll"}
                        p={4}
                        whiteSpace="nowrap"
                        children={`${getGitLogCommand()}`}

                    />
                </Flex>
                <Text color={"GrayText"} textAlign="center">
                    <i>(replace 100 with the number of commits you want to import)</i>
                </Text>
            </Box>
            <Box as="form" onSubmit={handleFormSubmit} mt={4} >
                <Box mb={5}>
                    <Heading size={"md"} mb={4}>
                        Import Git History
                    </Heading>
                    <Text mb={2}>
                        Paste the Console Output below to import your Git history.
                    </Text>
                    <Text>
                        Just wanna try?
                        <Text as='span' color={'blue'} cursor={'pointer'} onClick={onClickSample}> Click here</Text> to import a sample Git history.
                    </Text>
                </Box>
                <Flex flexDir={{ base: 'column', sm: 'row' }} gap={8}>
                    <Input
                        name='consoleOutput'
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
            <Box mt={20} px={20}>
                <WarningContent />
            </Box>
        </Flex>
    );
}
