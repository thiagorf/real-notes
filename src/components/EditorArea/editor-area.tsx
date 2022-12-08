import { useEffect, useRef, useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { RichEditor } from "react-native-pell-rich-editor";
import { EditorAreaContainer, NotesTitleInput } from "./editor-area-styles";
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

    useEffect(() => {
        if (editorRef.current) {
            console.log("editor is available");
            editorRef.current.setFontName("Jost");
        }
    }, []);

    return (
        <EditorAreaContainer>
            <NotesTitleInput
                placeholder="note title"
                onChange={handleTitleInputChange}
                value={noteTitle}
            />
            <Editor onChange={handleContentInputChange} ref={editorRef} />
            <EditorTools ref={editorRef} />
        </EditorAreaContainer>
    );
}
