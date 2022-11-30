import "react-native-get-random-values";
import { Note } from "./Note";
import { nanoid } from "nanoid";
import { Realm } from "@realm/react";

export type NotesInfoProperties = {
    id: string;
    title: string;
    createdAt: string;
    updatedAt?: Date;
    content?: Note;
};

export class NotesInfo extends Realm.Object {
    public id: string = nanoid();
    public title: string;
    public createdAt: string = new Date().toISOString();
    public updatedAt?: Date;
    public content?: Note;

    public static schema: Realm.ObjectSchema = {
        name: "NotesInfo",
        properties: {
            id: "string",
            title: "string",
            createdAt: "string",
            updatedAt: "string?",
            content: "Note?",
        },
        primaryKey: "id",
    };

    public static generate(title: string, content?: Note) {
        return {
            id: nanoid(),
            title,
            createdAt: new Date().toISOString(),
            updatedAt: null,
            content: content,
        };
    }
}

export type NotesInfoResult = Realm.Results<NotesInfo>;
