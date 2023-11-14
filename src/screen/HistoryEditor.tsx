import { FC, useEffect, useState } from "react";
import { CommitHistory, HistoryEditorProps } from "../types/App.types";
import {
  Box,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Flex,
  Text,
  Icon,
  Button,
  Modal,
  useToast,
} from "@chakra-ui/react";
import { TableFormRow } from "../components/TableFormRow";
import { countEditedCommits, generateEditScript } from "../helpers";
import { FaCheck } from "react-icons/fa";
import { ScriptModalContent } from "../components/modal/ScriptModalContent";

export const HistoryEditor: FC<HistoryEditorProps> = ({ commitHistory }) => {
  const toast = useToast();
  const originalCommitHistory: CommitHistory[] = commitHistory;
  const [currentCommitHistory, setCurrentCommitHistory] =
    useState<CommitHistory[]>(commitHistory);
  const [editScript, setEditScript] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setCurrentCommitHistory(commitHistory);
  }, [commitHistory]);

  const manageCommitEdited = (commit: CommitHistory, index: number) => {
    const newCommitHistory: CommitHistory[] = [...currentCommitHistory];
    newCommitHistory[index] = commit;
    setCurrentCommitHistory(newCommitHistory);
  };
  const getNumberOfCommitsChanged = () => {
    return countEditedCommits(currentCommitHistory);
  };

  const handleDoneClick = () => {
    try {
      const editScript = generateEditScript(currentCommitHistory);
      setEditScript(editScript);
      setIsModalOpen(true);
      toast({
        title: "Success",
        description: "Edit script generated successfully.",
        status: "success",
        duration: 3000,
        position: "top-right",
        isClosable: true,
        variant: "top-accent",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
        variant: "top-accent",
      });
    }
  };

  return (
    <Box>
      <Flex mb={10} alignItems={"center"} justifyContent={"space-between"}>
        <Box>
          <Text fontWeight={"semibold"}>
            {getNumberOfCommitsChanged() === 0
              ? "No commits changed"
              : `${getNumberOfCommitsChanged()} commit${
                  getNumberOfCommitsChanged() > 1 ? "s" : ""
                } changed`}
          </Text>

          <Text color={"GrayText"} mt={3}>
            Click on any field to edit, and press Done when you're finished.
          </Text>
        </Box>
        <Box>
          <Button
            isDisabled={getNumberOfCommitsChanged() === 0}
            onClick={handleDoneClick}
            leftIcon={<Icon as={FaCheck} />}
            colorScheme={"green"}
            variant={"outline"}
            mr={2}>
            Done
          </Button>
        </Box>
      </Flex>
      <TableContainer>
        <Table variant={"striped"} colorScheme={"gray"}>
          <Thead>
            <Tr>
              <Th>SHA</Th>
              <Th>Author Name</Th>
              <Th>Author Email</Th>
              <Th>Date</Th>
              <Th>Message</Th>
            </Tr>
          </Thead>
          <Tbody fontSize={13}>
            {currentCommitHistory.map(
              (commit: CommitHistory, index: number) => {
                return (
                  <TableFormRow
                    key={commit.hash}
                    index={index}
                    commit={commit}
                    onCommitEdited={manageCommitEdited}
                    originalRow={originalCommitHistory[index]}
                  />
                );
              }
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size={"3xl"}>
        <ScriptModalContent script={editScript} />
      </Modal>
    </Box>
  );
};
