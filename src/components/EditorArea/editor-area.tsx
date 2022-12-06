import { useRef, useState } from "react";
import {
    NativeSyntheticEvent,
    TextInputChangeEventData,
    View,
} from "react-native";
import { RichEditor } from "react-native-pell-rich-editor";
import { NotesTitleInput } from "./editor-area-styles";
import { Editor } from "../Editor";
import { EditorTools } from "../EditorTools";

export function EditorArea() {
    const editorRef = useRef<RichEditor>(null);

    const [noteTitle, setNoteTitle] = useState<string>();
    const [editorContent, setEditorContent] = useState<string>();

    function handleTitleInputChange({
        nativeEvent: { text },
    }: NativeSyntheticEvent<TextInputChangeEventData>) {
        setNoteTitle(text);
    }

    function handleContentInputChange(text: string) {
        setEditorContent(text);
    }

    return (
        <View>
            <NotesTitleInput
                placeholder="note title"
                onChange={handleTitleInputChange}
                value={noteTitle}
            />
            <Editor onChange={handleContentInputChange} ref={editorRef} />
            <EditorTools editorRef={editorRef.current!} />
        </View>
    );
}
