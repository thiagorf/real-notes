export class Note {
    public content: string;

    public static schema: Realm.ObjectSchema = {
        name: "Note",
        properties: {
            content: "string",
        },
    };
}
