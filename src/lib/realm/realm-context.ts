import { Realm, createRealmContext } from "@realm/react";
import { Note } from "./schema/Note";
import { NotesInfo } from "./schema/NotesInfo";

const config: Realm.Configuration = {
    path: "RealNotesDB",
    deleteRealmIfMigrationNeeded: true,
    schema: [Note, NotesInfo],
};

export default createRealmContext(config);
