import { Realm, createRealmContext } from "@realm/react";
import { NotesInfo } from "./schema/NotesInfo";

const config: Realm.Configuration = {
    path: "RealNotesDB",
    deleteRealmIfMigrationNeeded: true,
    schema: [NotesInfo],
};

export default createRealmContext(config);
