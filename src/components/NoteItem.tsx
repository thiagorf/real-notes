import { Text } from "react-native";
import styled from "styled-components/native";

const NoteCard = styled.View`
    border-width: 2px;
    border-color: #373737;
    padding: 15px;
    margin: 2px 4px;
`;

export const NoteItem = () => {
    return (
        <NoteCard>
            <Text>Note item</Text>
        </NoteCard>
    );
};
