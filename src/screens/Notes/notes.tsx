import { useCallback, useEffect, useRef, useState } from "react";
import RealmContext from "../../lib/realm/realm-context";
import {
    Alert,
    Keyboard,
    NativeSyntheticEvent,
    Pressable,
    ScrollView,
    TextInputChangeEventData,
    View,
    Animated,
    StyleSheet,
    ViewStyle,
} from "react-native";
import {
    RichEditor,
    RichToolbar,
    actions,
} from "react-native-pell-rich-editor";
import { UpdateMode } from "realm";
import { EditorContainer, ToolbarCTA } from "./notes-styles";
import { SavingPopup } from "../../components/SavingPopup";
import { NotesInfo } from "../../lib/realm/schema/NotesInfo";
import {
    EditorToolbar,
    NotesTitleInput,
    ScreenEditorContainer,
} from "./notes-styles";
import { NotesRouteProps } from "../../app-routes";
import useLatest from "../../hooks/useLatest";
import Icon from "react-native-vector-icons/AntDesign";

const { useRealm } = RealmContext;

export const Notes = ({ route }: NotesRouteProps) => {
    const toolbarToggleOpacity = useRef(new Animated.Value(1)).current;

    const [isToolbarVisible, setIsToolbarVisible] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const [editorContent, setEditorContent] = useState("");
    const [noteTitle, setNoteTitle] = useState("");

    const latestTitle = useLatest(noteTitle);
    const latestContent = useLatest(editorContent);

    const realm = useRealm();

    const editorRef = useRef<RichEditor | null>(null);
    const scrollRef = useRef<ScrollView>(null);

    const animation = useCallback(() => {
        return Animated.timing(toolbarToggleOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        });
    }, [toolbarToggleOpacity]);

    const animationStart = (callback?: Animated.EndCallback | undefined) => {
        animation().start(callback);
    };

    const animationReset = () => {
        animation().reset();
    };

    const handleToolbarTransition = () => {
        animationStart(({ finished }) => {
            if (finished) {
                setIsToolbarVisible(true);
            }
        });
        animationReset();
    };

    const getNote = useCallback(
        (id: string) => {
            realm.write(async () => {
                const note = realm.objectForPrimaryKey<NotesInfo>(
                    NotesInfo.schema.name,
                    id
                );
                if (note) {
                    const { title, content } = note;
                    console.log(note);
                    setNoteTitle(title);
                    setEditorContent(content!);

                    if (editorRef.current) {
                        console.log("editor is rendered");
                        editorRef.current.setContentHTML(content!);
                    }
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
                {isToolbarVisible ? (
                    <RichToolbar
                        getEditor={() => editorRef.current!}
                        actions={[
                            actions.setBold,
                            actions.setItalic,
                            actions.insertImage,
                            "hide",
                        ]}
                        iconMap={{
                            hide: () => {
                                return (
                                    <Pressable
                                        onPress={() =>
                                            setIsToolbarVisible(false)
                                        }
                                    >
                                        <Icon name="closecircleo" size={20} />
                                    </Pressable>
                                );
                            },
                        }}
                        style={{
                            borderWidth: 1,
                            borderColor: "#CEBDBD",
                        }}
                    />
                ) : (
                    <ToolbarCTA
                        animatedOpacityValue={toolbarToggleOpacity}
                        handlePress={handleToolbarTransition}
                    />
                )}
            </EditorToolbar>
            <SavingPopup
                isVisible={isVisible}
                handleVisibility={setIsVisible}
            />
        </ScreenEditorContainer>
    );
};
