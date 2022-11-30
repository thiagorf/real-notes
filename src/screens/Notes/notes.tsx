import { useCallback, useEffect, useRef, useState } from "react";
import RealmContext from "../../lib/realm/realm-context";
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
import { UpdateMode } from "realm";
import { EditorContainer } from "../../components/EditorContainer";
import { SavingPopup } from "../../components/SavingPopup";
import { NotesInfo } from "../../lib/realm/schema/NotesInfo";
import {
    EditorToolbar,
    NotesTitleInput,
    ScreenEditorContainer,
} from "./notes-styles";
import { Props } from "../../../App";

const { useRealm } = RealmContext;

export const Notes = ({ route }: Props) => {
    const [editorContet, setEditorContent] = useState("");
    const [noteTitle, setNoteTitle] = useState("");

    //route have param -> load note
    console.log(route.params.id);

    const realm = useRealm();

    const editorRef = useRef<RichEditor>(null);
    const scrollRef = useRef<ScrollView>(null);

    const createNote = useCallback(() => {
        realm.write(() => {
            const noteContent = realm.create(
                NotesInfo.schema.name,
                NotesInfo.generate(noteTitle, editorContet),
                UpdateMode.All
            );
            console.log(noteContent);
        });
    }, [realm]);

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
        const keyboardHide = Keyboard.addListener(
            "keyboardDidHide",
            async () => {
                console.log("Keyboard hide");

                if (noteTitle.length && editorContet.length) {
                    console.log("Save content in db");
                    createNote();
                    /*
					const realm = await initRealm();
                    cbRealm(realm, () => {
                        const content = new Note(editorContet);
                        const noteContent = realm.create<Note>(
                            Note.schema.name,
                            content,
                            UpdateMode.All
                        );
                        const notesInfo = new NotesInfo(noteTitle, noteContent);
                        const note = realm.create<NotesInfo>(
                            NotesInfo.schema.name,
                            notesInfo,
                            UpdateMode.All
                        );
                        console.log(note);
                    });
					*/
                }
            }
        );

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
            <SavingPopup />
        </ScreenEditorContainer>
    );
};
