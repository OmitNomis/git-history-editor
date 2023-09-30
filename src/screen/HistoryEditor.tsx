import { FC, useEffect, useState } from "react";
import { CommitHistory, HistoryEditorProps } from "../types/App.types";
import { Box, TableContainer, Table, Thead, Tbody, Th, Tr, Icon } from "@chakra-ui/react";
import { FaUndo } from "react-icons/fa";
import { TableFormRow } from "../components/TableFormRow";


export const HistoryEditor: FC<HistoryEditorProps> = ({ commitHistory }) => {
    const originalCommitHistory: CommitHistory[] = commitHistory;
    const [currentCommitHistory, setCurrentCommitHistory] = useState<CommitHistory[]>(commitHistory);

    useEffect(() => {
        setCurrentCommitHistory(commitHistory);
    }, [commitHistory]);

    const resetSingleRow = (index: number) => {
    }

    return (
        <Box p={4}>
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
                                <>
                                    <Box position={"relative"}>
                                        <Icon position={"absolute"} as={FaUndo} onClick={() => resetSingleRow(index)} top={5} left={1} />
                                    </Box>
                                    <TableFormRow
                                        index={index}
                                        commit={commit}
                                    />
                                </>
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box >
    );
}
