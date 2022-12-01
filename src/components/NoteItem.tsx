import { Text } from "react-native";
import styled from "styled-components/native";
import { NotesInfoProperties } from "../lib/realm/schema/NotesInfo";

const NoteCard = styled.View`
    border-width: 2px;
    border-color: #373737;
    padding: 15px;
    margin: 2px 4px;
`;

type NoteItemProps = {
    note: NotesInfoProperties;
};

export const NoteItem = ({ note }: NoteItemProps) => {
    return (
        <NoteCard>
            <Text>{note.title}</Text>
        </NoteCard>
    );
};
