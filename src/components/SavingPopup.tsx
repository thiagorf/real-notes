import { useCallback, useEffect, useRef } from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";

interface PopupProps {
    opacity?: number | Animated.Value;
}

const PopupContainer = styled(Animated.View)`
    position: absolute;
    right: 3px;
    bottom: 60px;
    background-color: #fff;
    border-width: 1.5px;
    border-color: #707070;
    border-radius: 4px;
    width: 100px;
    height: 30px;
`;

const PopupMssage = styled.Text`
    font-family: monospace;
    font-size: 15px;
    color: #707070;
    text-align: center;
    margin: auto 0;
`;

export const SavingPopup = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current!;

    const animation = useCallback(() => {
        return Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        });
    }, [fadeAnim]);

    const handleStop = () => animation().reset();

    useEffect(() => {
        animation().start();
    }, []);

    return (
        <PopupContainer
            style={{
                opacity: fadeAnim,
            }}
            onTouchStart={handleStop}
        >
            <PopupMssage>Saving...</PopupMssage>
        </PopupContainer>
    );
};
