import { Realm } from "@realm/react";

export class Note extends Realm.Object {
    public content: string;

    public static schema: Realm.ObjectSchema = {
        name: "Note",
        properties: {
            content: "string",
        },
    };

    public static generate(content: string) {
        return {
            content,
        };
    }
}
