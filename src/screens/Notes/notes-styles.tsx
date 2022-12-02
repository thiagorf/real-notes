import { forwardRef, PropsWithChildren } from "react";
import { PressableProps, ScrollView, Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import styled from "styled-components/native";

export const ScreenEditorContainer = styled.SafeAreaView`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #fff;
`;

export const NotesTitleInput = styled.TextInput`
    border-width: 1px;
    padding: 2px 8px;
`;

export const EditorToolbar = styled.View`
    position: relative;
    height: 75px;
`;

const ScrollContainer = styled.ScrollView`
    background-color: #fff;
`;

export const EditorContainer = forwardRef<ScrollView, PropsWithChildren>(
    (props, ref) => (
        <ScrollContainer ref={ref}>{props.children}</ScrollContainer>
    )
);

const ToolbarWrapper = styled.Pressable`
    position: absolute;
    right: 15px;
    background-color: #fff;
    width: 60px;
    height: 60px;
`;

const ToolbarCTAIcon = styled(Icon)`
    border: 1px solid #cebdbd;
    background-color: #d0e4c7;
    border-radius: 4px;
    padding-top: 16px;
    text-align: center;
    height: 100%;
`;

export const ToolbarCTA = ({ ...props }: PressableProps) => {
    return (
        <ToolbarWrapper {...props}>
            <ToolbarCTAIcon name="appstore-o" size={28} />
        </ToolbarWrapper>
    );
};
