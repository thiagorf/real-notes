import { useState } from "react";
import {
    actions,
    RichEditor,
    RichToolbar,
} from "react-native-pell-rich-editor";
import {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
import { IconProps } from "react-native-vector-icons/Icon";
import { ToolbarIcon } from "../ToolbarIcon";
import { EditorToolbar, ToolbarCTA } from "./editor-tools-styles";

type ActiosKey = "hide";

type IconMapping = Record<ActiosKey, IconProps>;

interface EditorToolsProperties {
    editorRef: RichEditor;
}

const icons: IconMapping = {
    hide: {
        name: "closecircleo",
        size: 20,
    },
};

export function EditorTools({ editorRef }: EditorToolsProperties) {
    const [isToolbarVisible, setIsToolbarVisible] = useState(false);

    const toolbarOpacityAnimated = useSharedValue(0);
    const ctaOpacityAnimated = useSharedValue(1);

    const animatedToolbarOpacity = useAnimatedStyle(() => {
        return {
            opacity: toolbarOpacityAnimated.value,
        };
    });

    const animatedCTAOpacity = useAnimatedStyle(() => {
        return {
            opacity: ctaOpacityAnimated.value,
        };
    });

    function changeToolbarOpacity() {
        const newValue = toolbarOpacityAnimated.value === 0 ? 1 : 0;
        toolbarOpacityAnimated.value = withTiming(
            newValue,
            {
                duration: 300,
            },
            () => {
                setIsToolbarVisible(true);
            }
        );
    }

    function changeCTAOpacity() {
        const newValue = ctaOpacityAnimated.value === 1 ? 0 : 1;
        ctaOpacityAnimated.value = withTiming(
            newValue,
            {
                duration: 300,
            },
            () => {
                setIsToolbarVisible(false);
            }
        );
    }

    return (
        <EditorToolbar>
            {isToolbarVisible && (
                <RichToolbar
                    getEditor={() => editorRef}
                    actions={[
                        actions.setBold,
                        actions.setItalic,
                        actions.insertImage,
                        "hide",
                    ]}
                    iconMap={{
                        hide: () => (
                            <ToolbarIcon
                                onPress={changeToolbarOpacity}
                                icon={icons.hide}
                            />
                        ),
                    }}
                    style={[
                        {
                            borderWidth: 1,
                            borderColor: "#CEBDBD",
                        },
                        animatedToolbarOpacity,
                    ]}
                />
            )}
            {!isToolbarVisible && (
                <ToolbarCTA
                    handlePress={changeCTAOpacity}
                    style={[animatedCTAOpacity]}
                />
            )}
        </EditorToolbar>
    );
}
