import { forwardRef, useState } from "react";
import {
    actions,
    RichEditor,
    RichToolbar,
} from "react-native-pell-rich-editor";
import {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolate,
} from "react-native-reanimated";
import type { IconProps } from "react-native-vector-icons/Icon";
import { ToolbarIcon } from "../ToolbarIcon";
import { EditorToolbar, ToolbarCTA } from "./editor-tools-styles";

type ActiosKey = "hide";

type IconMapping = Record<ActiosKey, IconProps>;

const icons: IconMapping = {
    hide: {
        name: "closecircleo",
        size: 20,
        style: null,
    },
};

export const EditorTools = forwardRef<RichEditor, unknown>((_, ref) => {
    const [isToolbarVisible, setIsToolbarVisible] = useState(false);

    // value 0 = toolbar cta is visible
    // value 1 = rich editor toolbar is visible
    const toolbarOpacityAnimated = useSharedValue(0);

    const animatedToolbarOpacity = useAnimatedStyle(() => {
        return {
            opacity: interpolate(toolbarOpacityAnimated.value, [0, 1], [0, 1]),
        };
    });

    const animatedCTAOpacity = useAnimatedStyle(() => {
        return {
            opacity: interpolate(toolbarOpacityAnimated.value, [0, 1], [1, 0]),
        };
    });

    function handleToolbarToggle() {
        const newValue = toolbarOpacityAnimated.value === 0 ? 1 : 0;

        toolbarOpacityAnimated.value = withTiming(newValue, {
            duration: 300,
        });
        setIsToolbarVisible(!isToolbarVisible);
    }

    return (
        <EditorToolbar>
            {isToolbarVisible && (
                <RichToolbar
                    editor={ref}
                    actions={[
                        actions.setBold,
                        actions.setItalic,
                        actions.insertImage,
                        "hide",
                    ]}
                    iconMap={{
                        hide: () => (
                            <ToolbarIcon
                                onPress={handleToolbarToggle}
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
                    handlePress={handleToolbarToggle}
                    style={[animatedCTAOpacity]}
                />
            )}
        </EditorToolbar>
    );
});
