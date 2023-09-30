import { FC, useState } from "react";
import { Container, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react'
import { AppIntroduction } from "../components/AppIntroduction";


export const AppContent: FC = () => {

    const [tabIndex, setTabIndex] = useState(0);
    const [consoleOutput, setConsoleOutput] = useState<string>("");

    const handleTabsChange = (index: number) => {
        setTabIndex(index);
    }
    const handleImport = (output: string) => {
        console.log(output)
        setConsoleOutput(output);
    }

    return (
        <Container background={'gray.50'} my={10} maxW={'container.lg'} p={10}>
            <Tabs tabIndex={tabIndex} onChange={handleTabsChange} isFitted variant={"line"}>
                <TabList mb={10}>
                    <Tab>Import</Tab>
                    <Tab isDisabled>Edit</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <AppIntroduction handleImport={handleImport} />
                    </TabPanel>
                    <TabPanel>
                        <>Hello World</>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
}

