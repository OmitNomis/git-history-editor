import { FC, useState } from "react";
import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  useToast,
} from "@chakra-ui/react";
import { AppIntroduction } from "../components/AppIntroduction";
import { formatDecodedOutput } from "../helpers";
import { CommitHistory } from "../types/App.types";
import { HistoryEditor } from "./HistoryEditor";

export const AppContent: FC = () => {
  const toast = useToast();
  const [tabIndex, setTabIndex] = useState(0);
  const [commitHistory, setCommitHistory] = useState<CommitHistory[]>([]);
  const [isValidDataLoaded, setIsValidDataLoaded] = useState<boolean>(false);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };
  const handleImport = (output: string) => {
    try {
      const parsedOutput = formatDecodedOutput(output);
      setIsValidDataLoaded(true);
      setCommitHistory(parsedOutput);
      handleTabsChange(1);
      toast({
        title: "Import Successful",
        description: "Commit History Imported Successfully",
        status: "success",
      });
    } catch {
      toast({
        title: "Invalid Input",
        description: "Invalid Commit History Input",
        status: "error",
      });
      return;
    }
  };
  return (
    <Container
      background={"white"}
      my={{ base: 2, md: 8 }}
      maxW={"container.xl"}
      p={{ base: 4, md: 8 }}
      rounded={{ base: "lg", md: "xl" }}
      boxShadow={"sm"}
      borderWidth={"1px"}
      borderColor={"gray.200"}>
      <Tabs
        index={tabIndex}
        onChange={handleTabsChange}
        isFitted
        variant={"line"}>
        <TabList mb={10}>
          <Tab>Import</Tab>
          <Tab isDisabled={!isValidDataLoaded}>Edit</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AppIntroduction handleImport={handleImport} />
          </TabPanel>
          <TabPanel>
            <HistoryEditor commitHistory={commitHistory} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};
