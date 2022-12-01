import { useCallback, useEffect, useRef, useState } from "react";
import RealmContext from "../../lib/realm/realm-context";
import {
    Alert,
    Keyboard,
    NativeSyntheticEvent,
    ScrollView,
    Text,
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
import { NotesRouteProps } from "../../app-routes";
import useLatest from "../../hooks/useLatest";

const { useRealm } = RealmContext;

export const Notes = ({ route }: NotesRouteProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    const [editorContent, setEditorContent] = useState("");
    const [noteTitle, setNoteTitle] = useState("");

    const latestTitle = useLatest(noteTitle);
    const latestContent = useLatest(editorContent);

    const realm = useRealm();

    const editorRef = useRef<RichEditor>(null);
    const scrollRef = useRef<ScrollView>(null);

    const getNote = useCallback(
        (id: string) => {
            realm.write(async () => {
                const note = realm.objectForPrimaryKey<NotesInfo>(
                    NotesInfo.schema.name,
                    id
                );
                if (note) {
                    const { title, content } = note;
                    setNoteTitle(title);
                    setEditorContent(content!);

                    if (editorRef.current) {
                        console.log("Editor ref is available");
                        editorRef.current.setContentHTML(content!);
                    }

                    setIsLoading(false);
                }
            });
        },
        [realm]
    );

    const createNote = useCallback(
        (title: string, content: string) => {
            realm.write(() => {
                if (route.params.id) {
                    const selectedNote = realm.objectForPrimaryKey<NotesInfo>(
                        NotesInfo.schema.name,
                        route.params.id
                    );

                    if (selectedNote) {
                        selectedNote.title = title;
                        selectedNote.content = content;
                        selectedNote.updatedAt = new Date().toISOString();
                    } else {
                        Alert.alert("Error", "Invalid or inexisting note");
                    }
                } else {
                    realm.create(
                        NotesInfo.schema.name,
                        NotesInfo.generate(title, content),
                        UpdateMode.All
                    );
                }
            });
        },
        [realm]
    );

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
        if (route.params.id) getNote(route.params.id);

        const keyboardHide = Keyboard.addListener(
            "keyboardDidHide",
            async () => {
                if (
                    latestTitle.current.length &&
                    latestContent.current.length
                ) {
                    console.log("Save content in db");
                    setIsVisible(true);
                    createNote(latestTitle.current, latestContent.current);
                }
            }
        );

        return () => keyboardHide.remove();
    }, []);

    /*
    if (isLoading && route.params.id) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }*/

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
            <SavingPopup
                isVisible={isVisible}
                handleVisibility={setIsVisible}
            />
        </ScreenEditorContainer>
    );
};
