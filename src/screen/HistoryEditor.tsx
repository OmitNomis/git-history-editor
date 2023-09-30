import { FC, useEffect, useState } from "react";
import { CommitHistory, HistoryEditorProps } from "../types/App.types";
import { Box, TableContainer, Table, Thead, Tbody, Th, Tr, Flex, Text, IconButton, Icon, Button } from "@chakra-ui/react";
import { TableFormRow } from "../components/TableFormRow";
import { countEditedCommits } from "../helpers";
import { FaCheck } from "react-icons/fa";

export const HistoryEditor: FC<HistoryEditorProps> = ({ commitHistory }) => {
    const originalCommitHistory: CommitHistory[] = commitHistory;
    const [currentCommitHistory, setCurrentCommitHistory] = useState<CommitHistory[]>(commitHistory);

    useEffect(() => {
        setCurrentCommitHistory(commitHistory);
    }, [commitHistory]);

    const manageCommitEdited = (commit: CommitHistory, index: number) => {
        const newCommitHistory: CommitHistory[] = [...currentCommitHistory];
        newCommitHistory[index] = commit;
        setCurrentCommitHistory(newCommitHistory);
    }
    const getNumberOfCommitsChanged = () => {
        return countEditedCommits(currentCommitHistory);
    }

    const handleDoneClick = () => {
        console.log("Done clicked");
    }


    return (
        <Box>
            <Flex mb={10} alignItems={'center'} justifyContent={'space-between'} >
                <Box>
                    <Text fontWeight={'semibold'}>{
                        getNumberOfCommitsChanged() === 0
                            ? "No commits changed"
                            : `${getNumberOfCommitsChanged()} commit${getNumberOfCommitsChanged() > 1 ? "s" : ""} changed`
                    }</Text>
                </Box>
                <Box>
                    {/* done button with tick mark icon at left */}
                    <Button
                        isDisabled={getNumberOfCommitsChanged() === 0}
                        onClick={handleDoneClick}
                        leftIcon={<Icon as={FaCheck} />}
                        colorScheme={"green"}
                        variant={"outline"}
                        mr={2}
                    >
                        Done
                    </Button>
                </Box>
            </Flex>
            <TableContainer >
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
                        {currentCommitHistory.map((commit: CommitHistory, index: number) => {
                            return (
                                <TableFormRow
                                    key={commit.hash}
                                    index={index}
                                    commit={commit}
                                    onCommitEdited={manageCommitEdited}
                                    originalRow={originalCommitHistory[index]}
                                />
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box >
    );
}