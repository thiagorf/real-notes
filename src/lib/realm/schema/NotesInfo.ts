import { Note } from "./Note";
import { nanoid } from "nanoid";

export class NotesInfo {
    public id: string = nanoid();
    public title: string;
    public createdAt: string = new Date().toISOString();
    public updatedAt?: Date;
    public content?: Realm.Results<Note>;

    public static schema: Realm.ObjectSchema = {
        name: "NotesInfo",
        properties: {
            id: "string",
            title: "string",
            createdAt: "string",
            updatedAt: "string?",
            content: "Note?",
        },
    };

    constructor(title: string) {
        this.title = title;
    }
}

export type NotesInfoResult = Realm.Results<NotesInfo>;
