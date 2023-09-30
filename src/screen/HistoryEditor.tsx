import { FC, useEffect, useState } from "react";
import { CommitHistory, HistoryEditorProps } from "../types/App.types";
import { Box, TableContainer, Table, Thead, Tbody, Th, Tr } from "@chakra-ui/react";
import { TableFormRow } from "../components/TableFormRow";


export const HistoryEditor: FC<HistoryEditorProps> = ({ commitHistory }) => {
    const originalCommitHistory: CommitHistory[] = commitHistory;
    const [currentCommitHistory, setCurrentCommitHistory] = useState<CommitHistory[]>(commitHistory);

    useEffect(() => {
        setCurrentCommitHistory(commitHistory);
    }, [commitHistory]);

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
