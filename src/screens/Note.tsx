import { useRef, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import {
    RichEditor,
    RichToolbar,
    actions,
} from "react-native-pell-rich-editor";
import { debounce } from "../util/debounce";

export const Notes = () => {
    const [editorContet, setEditorContent] = useState("");
    const editorRef = useRef<RichEditor>(null);
    const scrollRef = useRef<ScrollView>(null);

    //Debounce for better performance?
    const handleContentInput = (text: string) => {
        debounce(() => setEditorContent(text), 1000);
        console.log(editorContet);
    };

    // Check https://github.com/wxik/react-native-rich-editor#scroll-problem
    const handleCursorPosition = (offsetY: number) => {
        const scroll = scrollRef.current;

        if (scroll) {
            scroll.scrollTo({ y: offsetY - 30, animated: true });
        }
    };

    return (
        <SafeAreaView>
            <ScrollView ref={scrollRef}>
                <RichEditor
                    ref={editorRef}
                    placeholder="Start typing..."
                    useContainer={true}
                    onCursorPosition={handleCursorPosition}
                    onChange={handleContentInput}
                />
            </ScrollView>
            <View>
                <RichToolbar
                    getEditor={() => editorRef.current!}
                    actions={[actions.setBold, actions.setItalic]}
                />
            </View>
        </SafeAreaView>
    );
};
