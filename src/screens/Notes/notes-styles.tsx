import { forwardRef, PropsWithChildren } from "react";
import { TouchableWithoutFeedbackProps, ViewStyle } from "react-native";
import { PressableProps, ScrollView, Animated, Pressable } from "react-native";
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

/*
type MaybeAnimated<T> = T | Animated.Value;
type BaseStyleTypes = string | number;

type AnimatedStyle<T> = {
    [Key in keyof T]: T[Key] extends BaseStyleTypes
        ? MaybeAnimated<T[Key]>
        : T[Key] extends Array<infer U>
        ? Array<AnimatedStyle<U>>
        : AnimatedStyle<T[Key]>;
};
*/

interface ToolbarProps {
    handlePress: () => unknown;
    animatedOpacityValue: Animated.Value;
}

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

//const ToolbarAnimatedWrapper = Animated.createAnimatedComponent(ToolbarWrapper);

export const ToolbarCTA = ({
    animatedOpacityValue,
    handlePress,
}: ToolbarProps) => {
    return (
        <ToolbarWrapper
            as={Animated.View}
            style={{
                opacity: animatedOpacityValue,
            }}
        >
            <PressableArea onPress={handlePress}>
                <ToolbarCTAIcon name="appstore-o" size={28} />
            </PressableArea>
        </ToolbarWrapper>
    );
};
