import {
  Tr,
  Td,
  Editable,
  EditableInput,
  EditablePreview,
  Icon,
  Input,
  Flex,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import {
  CommitHistory,
  EditableField,
  TableFormRowProps,
} from "../types/App.types";
import { FaUndo } from "react-icons/fa";
import { checkSingleEditedContent } from "../helpers";

export const TableFormRow: FC<TableFormRowProps> = ({
  commit,
  index,
  onCommitEdited,
  originalRow,
}) => {
  const [editedCommit, setEditedCommit] = useState<CommitHistory>(commit);
  const reset = () => {
    setEditedCommit(originalRow);
  };

  useEffect(() => {
    onCommitEdited(editedCommit, index);
  }, [editedCommit, index, onCommitEdited]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name as EditableField;
    setEditedCommit({
      ...editedCommit,
      [field]: e.target.value,
      edited: {
        ...editedCommit.edited,
        [field]: checkSingleEditedContent(originalRow[field], e.target.value),
      },
    });
  };
  const checkAnyEdited = () => {
    return Object.values(editedCommit.edited).some((value) => value === true);
  };

  return (
    <>
      <Tr key={editedCommit.hash}>
        <Td>
          <Flex gap={3} alignItems={"center"}>
            <Icon
              cursor={checkAnyEdited() ? "pointer" : "not-allowed"}
              color={checkAnyEdited() ? "brand.500" : "gray.400"}
              as={FaUndo}
              onClick={reset}
              title="Reset this commit"
            />
            {editedCommit.hash.slice(0, 7)}
          </Flex>
        </Td>
        <Td>
          <Editable
            color={editedCommit.edited.authorName ? "red" : "black"}
            value={editedCommit.authorName}>
            <EditablePreview />
            <EditableInput
              name="authorName"
              value={editedCommit.authorName}
              onChange={handleChange}
            />
          </Editable>
        </Td>
        <Td>
          <Editable
            value={editedCommit.authorEmail}
            color={editedCommit.edited.authorEmail ? "red" : "black"}>
            <EditablePreview />
            <EditableInput
              name="authorEmail"
              value={editedCommit.authorEmail}
              onChange={handleChange}
            />
          </Editable>
        </Td>
        <Td>
          <Input
            name="dateTime"
            color={editedCommit.edited.dateTime ? "red" : "black"}
            value={editedCommit.dateTime}
            type="datetime-local"
            onChange={handleChange}
          />
        </Td>
        <Td>
          <Editable
            value={editedCommit.message}
            color={editedCommit.edited.message ? "red" : "black"}>
            <EditablePreview />
            <EditableInput
              name="message"
              value={editedCommit.message}
              onChange={handleChange}
            />
          </Editable>
        </Td>
      </Tr>
    </>
  );
};
