
import { Box, Container, Heading } from "@chakra-ui/react";

export const Header = () => {
    return (
        <Box bg="gray.800" color={"white"} py={8}>
            <Container maxW={'container.lg'} >
                <Heading as="h1" size="2xl" >
                    CommitCraft
                </Heading>
            </Container>
        </Box>
    );
}