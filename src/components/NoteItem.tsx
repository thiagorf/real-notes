import { Text } from "react-native";
import styled from "styled-components/native";
import { NotesInfoProperties } from "../lib/realm/schema/NotesInfo";

const NoteCard = styled.View`
    border-width: 2px;
    border-color: #373737;
    padding: 15px;
    margin: 2px 4px;
`;

export const NoteItem = ({ title }: NotesInfoProperties) => {
    return (
        <NoteCard>
            <Text>{title}</Text>
        </NoteCard>
    );
};
