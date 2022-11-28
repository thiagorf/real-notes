import { Text, TouchableHighlightProps } from "react-native";
import styled from "styled-components/native";

interface BaseButtonProps extends TouchableHighlightProps {
    buttonLabel: string;
}

const TouchableButton = styled.TouchableHighlight`
    border-width: 1px;
    width: 100%;
`;

export const BaseButton = ({ buttonLabel, ...rest }: BaseButtonProps) => {
    return (
        <TouchableButton {...rest}>
            <Text>{buttonLabel}</Text>
        </TouchableButton>
    );
};
