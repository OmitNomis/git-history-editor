import { useState, FC } from 'react'
import { Box, Button, Code, Flex, Heading, Text, Input, useToast } from "@chakra-ui/react";
import { FaCopy, FaDownload } from "react-icons/fa";
import { b64UnicodeDecoder } from '../helpers';
import { AppIntroductionProps } from '../types/App.types';

export const AppIntroduction: FC<AppIntroductionProps> = ({ handleImport }) => {

    const [consoleOutput, setConsoleOutput] = useState<string>("");
    const toast = useToast();

    const handleCodeCopy = () => {
        const gitLogCommand = 'git log -100 --pretty=format:"%H*#%an*#%ae*#%at*#%s" | base64 | tr -d "\n"';
        navigator.clipboard.writeText(gitLogCommand);
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
                title: "Invalid Input",
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
    const onClickSample = () => {
        setConsoleOutput('NzBkYzU0Y2Y5YjNmZDFlNDkwNTYyYzU2ODA1ZDNhMjQxMWRlZTgxYyojU2FtcGxlIE5hbWUqI1NhbXBsZUVtYWlsQHNhbXBsZS5jb20qIzE2NzQyNDMwMDAqI3RoaXMgaXMgYW4gZWRpdGVkIGNvbW1pdAoxM2U4Y2UzNjA5NTMwNGYxMTJhZjRiMjEwNjQxZGJkNDI0MDc3ZDA5KiNTYW1wbGUgTmFtZSojc2FtcGxlRW1haWxAc2FtcGxlLmNvbSojMTY3Mzg1MDEyMCojdGhpcyBpcyBhbiBlZGl0ZWQgY29tbWl0CjljY2Q5MGVhNmNmNGQ0ZDE3ZjMwMDk1ZDg4MDFlNzNlOTViNmFmZWMqI1NhbXBsZU5hbWUqI3NhbXBsZUVtYWlsQHNhbXBsZS5jb20qIzE2NzM3MjA0MDAqI3JlbW92ZSB1bnVzZWQgcGFja2FnZQoyZjg1MzYxNTU3N2E5MGM3MTQ5M2I2NmQyNzE0OGMxOTA4OTg4YjY0KiNTYW1wbGVOYW1lKiNzYW1wbGVFbWFpbEBzYW1wbGUuY29tKiMxNjczNzIwMDAxKiNyZW1vdmUgY29uc29sZS5sb2cKOWUwY2U3NjY0NjkxMjA4OGJhMzc2ODY4M2Q0YmMzNGVlZTBlNjRhNyojU2FtcGxlTmFtZSojc2FtcGxlRW1haWxAc2FtcGxlLmNvbSojMTY3MzcxOTM2MCojcmVtb3ZlIHVudXNlZCBpbXBvcnRzCjljNjljMjdmNzhiOGM5Y2Q3MDNmNTAwZmIwMzYyOGViNjNjMGMwMWIqI1NhbXBsZU5hbWUqI3NhbXBsZUVtYWlsQHNhbXBsZS5jb20qIzE2NzM3MTkyMjAqI3JlbW92ZSBzdHlsZXMKNDRjN2E4YTFlNWZkZWU5MjQwM2E2OTQyYmZlMGM2YTdmYTcwZDUzMSojU2FtcGxlTmFtZSojc2FtcGxlRW1haWxAc2FtcGxlLmNvbSojMTY3MzcxOTE4NyojYWRkIHNvbWUgc3R5cGVzCjM0ZTMyMDg2MjAxYzBjY2ExMTAyNGUxM2VkMzEzMDc3NWYzMzBiNjMqI1NhbXBsZU5hbWUqI3NhbXBsZUVtYWlsQHNhbXBsZS5jb20qIzE2NzM3MTkxNzgqI3NlcnZpY2Ugd29ya2VyCmM2MzNhYzczZjJmOWE1YjNiNTY3Mzg4YWMyMDY1NTdiNGMwNmNkOTcqI1NhbXBsZU5hbWUqI3NhbXBsZUVtYWlsQHNhbXBsZS5jb20qIzE2NzM3MTkwMjYqI2FkZCByZWFkbWUKNzJmZDdiNjUyMzI3MGFmOGIzNzkzMDQ2ZjYyZjIzYTVhOTYxMGRiZSojU2FtcGxlTmFtZSojc2FtcGxlRW1haWxAc2FtcGxlLmNvbSojMTY3MzcxODk5NSojZml4IGltcG9ydAo0N2ZjNjQ3OTY1YWU2YTAzNTMzN2NhZjIwNWE2NmE0MjllZDQxZGViKiNTYW1wbGVOYW1lKiNzYW1wbGVFbWFpbEBzYW1wbGUuY29tKiMxNjczNzE4Nzk5KiNmaXggZXJyb3JzIGZvciB2aXRlCjQ4NTljMzcwNzEwZDJiNjEzNmVkNDI3Mzk5OGZlY2ExYWVlMTk0NDQqI1NhbXBsZU5hbWUqI3NhbXBsZUVtYWlsQHNhbXBsZS5jb20qIzE2NzM3MTg0OTcqI2ZpbmlzaCB1cCBjb21wb25lbnQKYTY2NDRhY2Q0NzQ2YWMxMGE5YTJjNzY2ZWVlY2U1MDVmOWFjODVkNSojU2FtcGxlTmFtZSojc2FtcGxlRW1haWxAc2FtcGxlLmNvbSojMTY3MzcxODQ3NiojY29uZmlndXJlIG5ldyBwYWNrYWdlCjhjYzcyZmM2MmFmZWEzN2JkNmU1NTM5MjA4ZDZhZjZlZjFlMzRjNzUqI1NhbXBsZU5hbWUqI3NhbXBsZUVtYWlsQHNhbXBsZS5jb20qIzE2NzM3MTg0NjAqI2FkZCBuZXcgcGFja2FnZQpkZjg3OWVmYTExMzJlYzNiZWE1YmYwZTBiNjkzYjY4ZTBlOGVmMzcwKiNTYW1wbGVOYW1lKiNzYW1wbGVFbWFpbEBzYW1wbGUuY29tKiMxNjczNzE2NzEzKiNhZGQgYWxsIHBhZ2VzCjU1ZWI0ZDExYjEwOGRkZWViOTg3NWNhYjIwNDk0MjBkMDdhN2RhNjAqI1NhbXBsZU5hbWUqI3NhbXBsZUVtYWlsQHNhbXBsZS5jb20qIzE2NzM3MTY2OTEqI2FkZCBhbGwgY29tcG9uZW50cwpmZDMxZjc3YTFjYTI2MDM4ODNkY2VmNWVmYjc4ZTg2NzBhZGNhMTA5KiNTYW1wbGVOYW1lKiNzYW1wbGVFbWFpbEBzYW1wbGUuY29tKiMxNjczNzE2NjcxKiNhZGQgbmF2aWdhdGlvbiBjb21wb25lbnRzCmE4MjcxY2Y5YzVmNGUxMDUwODg2ZmNiMTZlYWVjYmRjZjc4YjAwM2IqI1NhbXBsZU5hbWUqI3NhbXBsZUVtYWlsQHNhbXBsZS5jb20qIzE2NzM3MTY2NDAqI2NoYW5nZSBzdHVmZiB0byBtYWtlIGFwcCBzdGFydCBkaXNwbGF5aW5nIHN0dWZmCmE3OWQyNTJkOTI2Njg4Y2FjOWRlNDI1MDgzYjBjMzU4YWZlMzNiNzgqI1NhbXBsZU5hbWUqI3NhbXBsZUVtYWlsQHNhbXBsZS5jb20qIzE2NzM3MTYzODkqI2FkZCBsaWIKMTZiNjc5ZjYwN2I3NDA2NDA3MWU1MGEzN2JjY2Y5ZWRiZDQwMGRkOSojU2FtcGxlTmFtZSojc2FtcGxlRW1haWxAc2FtcGxlLmNvbSojMTY3MzcxNjM1NyojYWRkIGN1c3RvbSBob29rcwpjODEwOTI1ZWM1M2Y4NzE5NjE3NmIyYzhlM2VjZTgzYjI0YjU4MmU3KiNTYW1wbGVOYW1lKiNzYW1wbGVFbWFpbEBzYW1wbGUuY29tKiMxNjczNzE2MzQwKiNhZGQgYXBpIHVybHMKMTRlMWQwNGQxY2FlYTZjYTQ2MzU1OGE1MTJjOWU1MDQ3NjIxOWVjYiojU2FtcGxlTmFtZSojc2FtcGxlRW1haWxAc2FtcGxlLmNvbSojMTY3MzcxNjMxNiojYWRkIG5hdiBpY29ucwpkYmJmOGZkMjhmZTk5YzczYmIwZjhlN2UyYTQzNTI1MzZjOTUyNWU1KiNTYW1wbGVOYW1lKiNzYW1wbGVFbWFpbEBzYW1wbGUuY29tKiMxNjczNzE2Mjk0KiNhZGQgaG9tZSBpY29ucwpmMmYzNTRiNjk2ODFhYWM3MWRhMWE4ODdlZWYwOWZmNDZkYzQyZjY5KiNTYW1wbGVOYW1lKiNzYW1wbGVFbWFpbEBzYW1wbGUuY29tKiMxNjczNzE2MjcyKiNhZGQgZm9udHMKMmNkODYyZDM4YTY3YTIyMmE3OTJkOGIyMzA1NzA5MjVlMzgwZWJlNSojU2FtcGxlTmFtZSojc2FtcGxlRW1haWxAc2FtcGxlLmNvbSojMTY3MzcxNjI1NSojYWRkIGFzc2V0cyBpY29uCjAxYjM3ZmJkNjZjNDQ0NDQ0YjAwM2EwNGQ4OGE2MGNjZjQzMDMzOWUqI1NhbXBsZU5hbWUqI3NhbXBsZUVtYWlsQHNhbXBsZS5jb20qIzE2NzM3MTYyMDkqI2FkZCBpbmRleC5odG1sCjljNmM0YjA5ZGE2ZWU5YjkwNWM2ZTIyZDlhOGUxMGU2OWVlYWIyYmEqI1NhbXBsZU5hbWUqI3NhbXBsZUVtYWlsQHNhbXBsZS5jb20qIzE2NzM3MTYxMjIqI2FkZCByb2JvdHMudHh0CjY1NDgxMmEyNTAwNTc1ZjA2NmI1ZDQwYjcxZjBhZjNkYTcwYWRlYTUqI1NhbXBsZU5hbWUqI3NhbXBsZUVtYWlsQHNhbXBsZS5jb20qIzE2NzM3MTYwNzgqI2ZpeCB0eXBvCmRhYjA0N2Q3OTRhMzk4OWUzZDhlYTQ4NWIwN2E4Njk5NzkzMGUwMmYqI1NhbXBsZU5hbWUqI3NhbXBsZUVtYWlsQHNhbXBsZS5jb20qIzE2NzM3MTYwNTkqI2FkZCBtYW5pZmVzdC5qc29uCmFlOGUxZmYxMjYyOWE2MGI0NWUyOTQ3MTcxMjcxZGIwMDEzM2Q3ZjUqI1NhbXBsZU5hbWUqI3NhbXBsZUVtYWlsQHNhbXBsZS5jb20qIzE2NzM3MTYwMzAqI2NoYW5nZSBpY29ucyBmb3IgZHVtbXkKZWQ1YmFmM2NlYWRiNDg2MmEwZTRjZTE3MzAwYTA5ZTcwZGIzMTI2YiojU2FtcGxlTmFtZSojc2FtcGxlRW1haWxAc2FtcGxlLmNvbSojMTY3MzcxNTk0MiojYSBkdW1teSBjb21taXQgbWVzc2FnZQphZDE5NjVjNGMyNjgzMTM1ZTU0ZmRmNzhkZGVmNzJmMWYyNzFmNTMwKiNTYW1wbGVOYW1lKiNzYW1wbGVFbWFpbEBzYW1wbGUuY29tKiMxNjczNzE1OTA5KiNzb21lIHN0dWZmCjQ4YTczMGYxODM0ZDVmN2EzZmMwY2M4OTkzMTQ1ZjZhY2U0NjFkMDkqI1NhbXBsZU5hbWUqI3NhbXBsZUVtYWlsQHNhbXBsZS5jb20qIzE2NzM3MTU3MjUqI2luaXQgcHJvamVjdA')
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
                <Flex>
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
        </Flex>
    );
}
