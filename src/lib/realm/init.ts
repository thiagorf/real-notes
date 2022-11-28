import Realm from "realm";
import { NotesInfo } from "./schema/NotesInfo";
import { Note } from "./schema/Note";

export const initRealm = async () => {
    return await Realm.open({
        path: "RealNotesDB",
        schema: [NotesInfo.schema, Note.schema],
        deleteRealmIfMigrationNeeded: true,
    });
};
