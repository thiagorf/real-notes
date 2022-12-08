import "react-native-pell-rich-editor";

declare module "react-native-pell-rich-editor" {
    interface RichEditor {
        setFontName: (text: string) => void;
    }
}
