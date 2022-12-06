import { ScreenEditorContainer } from "./notes-styles";
import { NotesRouteProps } from "../../app-routes";
import { EditorArea } from "../../components/EditorArea";

export function Notes({ route }: NotesRouteProps) {
    return (
        <ScreenEditorContainer>
            <EditorArea />
        </ScreenEditorContainer>
    );
}
