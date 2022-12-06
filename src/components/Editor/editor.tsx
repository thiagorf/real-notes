import { forwardRef, useRef } from "react";
import { ScrollView } from "react-native";
import { RichEditor } from "react-native-pell-rich-editor";
import { EditorContainer } from "./editor-styles";

interface RichEditorProperties {
    onChange: (text: string) => void;
}

export const Editor = forwardRef<RichEditor, RichEditorProperties>(
    ({ onChange }, ref) => {
        const scrollRef = useRef<ScrollView>(null);

        // Check https://github.com/wxik/react-native-rich-editor#scroll-problem
        function handleCursorPosition(offsetY: number) {
            const scroll = scrollRef.current;

            if (scroll) {
                scroll.scrollTo({ y: offsetY - 30, animated: true });
            }
        }

        return (
            <EditorContainer ref={scrollRef}>
                <RichEditor
                    ref={ref}
                    placeholder="Start typing..."
                    useContainer={true}
                    onCursorPosition={handleCursorPosition}
                    onChange={onChange}
                />
            </EditorContainer>
        );
    }
);
