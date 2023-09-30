import { Tr, Td, Editable, EditableInput, EditablePreview, Input } from '@chakra-ui/react'
import { FC, useState } from 'react'
import { formatMillisecondToDate } from '../helpers'
import { TableFormRowProps } from '../types/App.types'
import { CommitHistory } from '../types/App.types'
import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

export const TableFormRow: FC<TableFormRowProps> = ({ commit }) => {

    const [editedCommit, setEditedCommit] = useState<CommitHistory>(commit);

    return (
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
                <DateTimePicker
                    value={new Date(parseInt(editedCommit.time) * 1000)}
                // onChange={(date) => {
                //     setEditedCommit({
                //         ...editedCommit,
                //         time: date
                //     })
                // }}
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
    )
}
