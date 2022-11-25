import Realm from "realm";
import { Note, NotesInfo } from "./schemas";

export const initRealm = async () => {
    return await Realm.open({
        path: "RealNotesDB",
        schema: [NotesInfo, Note],
    });
};
