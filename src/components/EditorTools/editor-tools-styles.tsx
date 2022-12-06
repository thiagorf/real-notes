import { Animated, ViewProps } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import styled from "styled-components/native";

interface ToolbarProps extends ViewProps {
    handlePress: () => unknown;
}

export const EditorToolbar = styled.View`
    position: relative;
    height: 75px;
`;

const ToolbarWrapper = styled.View`
    position: absolute;
    right: 15px;
    background-color: #fff;
    width: 60px;
    height: 60px;
`;

const PressableArea = styled.Pressable`
    width: 100%;
    height: 100%;
`;

const ToolbarCTAIcon = styled(Icon)`
    border: 1px solid #cebdbd;
    background-color: #d0e4c7;
    border-radius: 4px;
    padding-top: 16px;
    text-align: center;
    height: 100%;
`;

export const ToolbarCTA = ({ handlePress, ...props }: ToolbarProps) => {
    return (
        <ToolbarWrapper as={Animated.View} {...props}>
            <PressableArea onPress={handlePress}>
                <ToolbarCTAIcon name="appstore-o" size={28} />
            </PressableArea>
        </ToolbarWrapper>
    );
};
