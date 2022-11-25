import { useRef } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { RichEditor } from "react-native-pell-rich-editor";

export const Notes = () => {
    const editorRef = useRef<RichEditor>();

    return (
        <SafeAreaView>
            <ScrollView>
                <RichEditor placeholder="Start typing..." />
            </ScrollView>
        </SafeAreaView>
    );
};
