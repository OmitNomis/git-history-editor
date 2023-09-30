import { Tr, Td, Editable, EditableInput, EditablePreview, Box, Icon, Input } from '@chakra-ui/react'
import { FC, useState } from 'react'
import { TableFormRowProps } from '../types/App.types'
import { CommitHistory } from '../types/App.types'
import { FaUndo } from 'react-icons/fa'

export const TableFormRow: FC<TableFormRowProps> = ({ commit }) => {
    const originalRow: CommitHistory = commit;
    const [editedCommit, setEditedCommit] = useState<CommitHistory>(commit);
    const reset = () => {
        setEditedCommit(originalRow)
    }

    return (
        <>
            <Box position={"relative"}>
                <Icon
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
                    <Editable defaultValue={editedCommit.authorName}>
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
                    <Editable defaultValue={editedCommit.authorEmail}>
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
                    <Editable defaultValue={editedCommit.message}>
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
