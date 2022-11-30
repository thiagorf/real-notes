import { Text, View, ViewProps } from "react-native";
import styled from "styled-components/native";
import { NotesInfoProperties } from "../lib/realm/schema/NotesInfo";
import {} from "react-native";

const NoteCard = styled.View`
    border-width: 2px;
    border-color: #373737;
    padding: 15px;
    margin: 2px 4px;
`;

type NoteItemProps = ViewProps & {
    note: NotesInfoProperties;
};

export const NoteItem = ({ note }: NoteItemProps) => {
    return (
        <NoteCard>
            <Text>{note.title}</Text>
        </NoteCard>
    );
};
