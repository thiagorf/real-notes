import { forwardRef, PropsWithChildren } from "react";
import { ScrollView } from "react-native";

import styled from "styled-components/native";

const ScrollContainer = styled.ScrollView`
    background-color: #fff;
`;

export const EditorContainer = forwardRef<ScrollView, PropsWithChildren>(
    (props, ref) => (
        <ScrollContainer ref={ref}>{props.children}</ScrollContainer>
    )
);
