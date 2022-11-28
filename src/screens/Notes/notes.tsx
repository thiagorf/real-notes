import { useEffect, useRef, useState } from "react";
import {
    Keyboard,
    NativeSyntheticEvent,
    ScrollView,
    TextInputChangeEventData,
    View,
} from "react-native";
import {
    RichEditor,
    RichToolbar,
    actions,
} from "react-native-pell-rich-editor";
import { EditorContainer } from "../../components/EditorContainer";
import {
    EditorToolbar,
    NotesTitleInput,
    ScreenEditorContainer,
} from "./notes-styles";

export const Notes = () => {
    const [editorContet, setEditorContent] = useState("");
    const [noteTitle, setNoteTitle] = useState("");

    const editorRef = useRef<RichEditor>(null);
    const scrollRef = useRef<ScrollView>(null);

    const handleTitleInput = ({
        nativeEvent: { text },
    }: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setNoteTitle(text);
    };

    //Debounce for better performance?
    const handleContentInput = (text: string) => {
        setEditorContent(text);
    };

    // Check https://github.com/wxik/react-native-rich-editor#scroll-problem
    const handleCursorPosition = (offsetY: number) => {
        const scroll = scrollRef.current;

        if (scroll) {
            scroll.scrollTo({ y: offsetY - 30, animated: true });
        }
    };

    useEffect(() => {
        const keyboardHide = Keyboard.addListener("keyboardDidHide", () => {
            console.log("Keyboard hide");
            console.log("a: ", noteTitle.length);
            console.log("b: ", editorContet.length);
            if (noteTitle.length && editorContet.length) {
                console.log(noteTitle.length);
                console.log(editorContet.length);
                console.log("Save content in db");
            }
        });

        return () => {
            keyboardHide.remove();
        };
    }, [noteTitle, editorContet]);

    return (
        <ScreenEditorContainer>
            <View>
                <NotesTitleInput
                    placeholder="note title"
                    onChange={handleTitleInput}
                    value={noteTitle}
                />
            </View>

            <EditorContainer ref={scrollRef}>
                <RichEditor
                    ref={editorRef}
                    placeholder="Start typing..."
                    useContainer={true}
                    onCursorPosition={handleCursorPosition}
                    onChange={handleContentInput}
                />
            </EditorContainer>
            <EditorToolbar>
                <RichToolbar
                    getEditor={() => editorRef.current!}
                    actions={[actions.setBold, actions.setItalic]}
                />
            </EditorToolbar>
        </ScreenEditorContainer>
    );
};
