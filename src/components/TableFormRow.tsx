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


    const handleChange = (e: any, field: string) => {
        setEditedCommit({
            ...editedCommit,
            [field]: e.target.value,
            edited: {
                ...editedCommit.edited,
                [field]: checkSingleEditedContent(originalRow[field], e.target.value)
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
                            name={`${editedCommit.hash}, authorName`}
                            value={editedCommit.authorName}
                            onChange={(e) => handleChange(e, 'authorName')}
                        />
                    </Editable></Td>
                <Td>
                    <Editable
                        value={editedCommit.authorEmail}
                        color={editedCommit.edited.authorEmail ? 'red' : 'black'}
                    >
                        <EditablePreview />
                        <EditableInput
                            name={`${editedCommit.hash}, authorEmail`}
                            value={editedCommit.authorEmail}
                            onChange={(e) => handleChange(e, 'authorEmail')}
                        />
                    </Editable>
                </Td>
                <Td>
                    <Input
                        name={`${editedCommit.hash}, dateTime`}
                        color={editedCommit.edited.dateTime ? 'red' : 'black'}
                        value={editedCommit.dateTime}
                        type='datetime-local'
                        onChange={(e) => handleChange(e, 'dateTime')}
                    />
                </Td>
                <Td>
                    <Editable
                        value={editedCommit.message}
                        color={editedCommit.edited.message ? 'red' : 'black'}
                    >
                        <EditablePreview />
                        <EditableInput
                            name={`${editedCommit.hash}, message`}
                            value={editedCommit.message}
                            onChange={(e) => handleChange(e, 'message')}
                        />
                    </Editable>
                </Td>
            </Tr>
        </>
    )
}
