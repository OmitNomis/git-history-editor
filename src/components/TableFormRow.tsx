import { Tr, Td, Editable, EditableInput, EditablePreview, Box, Icon, Input, } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { TableFormRowProps } from '../types/App.types'
import { CommitHistory } from '../types/App.types'
import { FaUndo } from 'react-icons/fa'
import { checkSingleEditedContent } from '../helpers'

export const TableFormRow: FC<TableFormRowProps> = ({ commit, index, onCommitEdited, originalRow }) => {
    const [editedCommit, setEditedCommit] = useState<CommitHistory>(commit);
    const reset = () => {
        setEditedCommit(originalRow);
    }

    useEffect(() => {
        onCommitEdited(editedCommit, index);
    }, [editedCommit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedCommit({
            ...editedCommit,
            [e.target.name]: e.target.value,
            edited: {
                ...editedCommit.edited,
                [e.target.name]: checkSingleEditedContent(originalRow[e.target.name], e.target.value)
            }
        })
    }
    const checkAnyEdited = () => {
        return Object.values(editedCommit.edited).some((value) => value === true);
    }

    return (
        <>
            <Box position={"relative"} h={'full'}>
                <Icon
                    cursor={checkAnyEdited() ? 'pointer' : 'not-allowed'}
                    color={checkAnyEdited() ? 'red' : 'gray.500'}
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
                        color={editedCommit.edited.authorName ? 'red' : 'black'}
                        value={editedCommit.authorName}>
                        <EditablePreview />
                        <EditableInput
                            name='authorName'
                            value={editedCommit.authorName}
                            onChange={handleChange}
                        />
                    </Editable></Td>
                <Td>
                    <Editable
                        value={editedCommit.authorEmail}
                        color={editedCommit.edited.authorEmail ? 'red' : 'black'}
                    >
                        <EditablePreview />
                        <EditableInput
                            name='authorEmail'
                            value={editedCommit.authorEmail}
                            onChange={handleChange}
                        />
                    </Editable>
                </Td>
                <Td>
                    <Input
                        name='dateTime'
                        color={editedCommit.edited.dateTime ? 'red' : 'black'}
                        value={editedCommit.dateTime}
                        type='datetime-local'
                        onChange={handleChange}
                    />
                </Td>
                <Td>
                    <Editable
                        value={editedCommit.message}
                        color={editedCommit.edited.message ? 'red' : 'black'}
                    >
                        <EditablePreview />
                        <EditableInput
                            name='message'
                            value={editedCommit.message}
                            onChange={handleChange}
                        />
                    </Editable>
                </Td>
            </Tr>
        </>
    )
}
