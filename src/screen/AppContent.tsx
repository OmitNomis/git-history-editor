import { FC, useState } from "react";
import { Flex, Box, Container, Heading, Text, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react'
import { AppIntroduction } from "../components/AppIntroduction";


export const AppContent: FC = () => {

    const [tabIndex, setTabIndex] = useState(0);

    const handleTabsChange = (index: number) => {
        setTabIndex(index);
    }


    return (
        <Container background={'gray.50'} shadow={"xl"} my={10} maxW={'container.lg'} p={10}>
            <Tabs tabIndex={tabIndex} onChange={handleTabsChange} isFitted variant={"enclosed"}>
                <TabList>
                    <Tab>Import</Tab>
                    <Tab isDisabled>Edit</Tab>
                    <Tab isDisabled>Export</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <AppIntroduction />
                    </TabPanel>
                    <TabPanel>
                        <>Hello World</>
                    </TabPanel>
                    <TabPanel>
                        <>Hello World2</>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
}

