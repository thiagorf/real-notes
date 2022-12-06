import { Pressable, StyleProp, TextStyle } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export interface ToolbarIconProperties {
    onPress: () => void;
    icon: {
        name: string;
        size?: number;
        style?: StyleProp<TextStyle>;
    };
}

export function ToolbarIcon({
    onPress,
    icon: { ...props },
}: ToolbarIconProperties) {
    return (
        <Pressable onPress={onPress}>
            <Icon {...props} />
        </Pressable>
    );
}
