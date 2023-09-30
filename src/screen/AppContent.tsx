import { FC, useState } from "react";
import { Container, Tabs, TabList, Tab, TabPanel, TabPanels, useToast } from '@chakra-ui/react'
import { AppIntroduction } from "../components/AppIntroduction";
import { formatDecodedOutput } from "../helpers";
import { CommitHistory } from "../types/App.types";
import { HistoryEditor } from "./HistoryEditor";

export const AppContent: FC = () => {

    const toast = useToast()
    const [tabIndex, setTabIndex] = useState(0);
    const [originalCommitHistory, setOriginalCommitHistory] = useState<CommitHistory[]>([]);
    const [commitHistory, setCommitHistory] = useState<CommitHistory[]>([]);
    const [isValidDataLoaded, setIsValidDataLoaded] = useState<boolean>(false);

    const handleTabsChange = (index: number) => {

        setTabIndex(index);
    }
    const handleImport = (output: string) => {
        console.log(formatDecodedOutput(output))
        try {
            const parsedOutput = formatDecodedOutput(output);
            setOriginalCommitHistory(parsedOutput);
            setCommitHistory(parsedOutput);
            setIsValidDataLoaded(true);
            handleTabsChange(1)
        } catch {
            toast({
                title: "Invalid Input",
                description: "Invalid Commit History Input",
                status: "error",
                duration: 3000,
                position: "top-right",
                isClosable: true,
                variant: 'top-accent'

            })
            return;

        }
    }

    return (
        <Container background={'gray.50'} my={10} maxW={'container.lg'} p={10}>
            <Tabs tabIndex={tabIndex} onChange={handleTabsChange} isFitted variant={"line"}>
                <TabList mb={10}>
                    <Tab>Import</Tab>
                    <Tab isDisabled={!isValidDataLoaded}>Edit</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <AppIntroduction handleImport={handleImport} />
                    </TabPanel>
                    <TabPanel>
                        <HistoryEditor />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
}

