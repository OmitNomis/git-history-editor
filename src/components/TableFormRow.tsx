import { Tr, Td, Editable, EditableInput, EditablePreview, Box, Icon, Input, } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { TableFormRowProps } from '../types/App.types'
import { CommitHistory } from '../types/App.types'
import { FaUndo } from 'react-icons/fa'
import { checkSingleEditedCommit, checkSingleEditedContent } from '../helpers'

export const TableFormRow: FC<TableFormRowProps> = ({ commit, index, onCommitEdited, originalRow }) => {
    const [editedCommit, setEditedCommit] = useState<CommitHistory>(commit);
    const reset = () => {
        setEditedCommit(originalRow);
        onCommitEdited(originalRow, index);
    }

    useEffect(() => {
        onCommitEdited(editedCommit, index);
    }, [editedCommit]);

    return (
        <>
            <Box position={"relative"} h={'full'}>
                <Icon
                    cursor={checkSingleEditedCommit(originalRow, editedCommit) ? 'pointer' : 'not-allowed'}
                    color={checkSingleEditedCommit(originalRow, editedCommit) ? 'red' : 'gray.500'}
                    position={"absolute"}
                    as={FaUndo}
                    onClick={reset}
                    left={1}
                    top={7}
                />
            </Box>
            <Tr key={editedCommit.hash}>
                <Td>{editedCommit.hash.slice(0, 7)}</Td>
                <Td>
                    <Editable
                        color={checkSingleEditedContent(originalRow.authorName, editedCommit.authorName) ? 'red' : 'black'}
                        value={editedCommit.authorName}>
                        <EditablePreview />
                        <EditableInput
                            value={editedCommit.authorName}
                            onChange={(e) => {
                                setEditedCommit({
                                    ...editedCommit,
                                    authorName: e.target.value
                                })
                            }}
                        />
                    </Editable></Td>
                <Td>
                    <Editable value={editedCommit.authorEmail}
                        color={checkSingleEditedContent(originalRow.authorEmail, editedCommit.authorEmail) ? 'red' : 'black'}
                    >
                        <EditablePreview />
                        <EditableInput
                            value={editedCommit.authorEmail}
                            onChange={(e) => {
                                setEditedCommit({
                                    ...editedCommit,
                                    authorEmail: e.target.value
                                })
                            }}
                        />
                    </Editable>
                </Td>
                <Td>
                    <Input
                        color={checkSingleEditedContent(originalRow.dateTime, editedCommit.dateTime) ? 'red' : 'black'}
                        value={editedCommit.dateTime}
                        type='datetime-local'
                        onChange={(e) => {
                            setEditedCommit({
                                ...editedCommit,
                                dateTime: e.target.value
                            })
                        }}
                    />
                </Td>
                <Td>
                    <Editable value={editedCommit.message} color={checkSingleEditedContent(originalRow.message, editedCommit.message) ? 'red' : 'black'}>
                        <EditablePreview />
                        <EditableInput
                            value={editedCommit.message}
                            onChange={(e) => {
                                setEditedCommit({
                                    ...editedCommit,
                                    message: e.target.value
                                })
                            }}
                        />
                    </Editable>
                </Td>
            </Tr>
        </>
    )
}
