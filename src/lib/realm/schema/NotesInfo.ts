import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { Realm } from "@realm/react";

export type NotesInfoProperties = {
    id: string;
    title: string;
    createdAt: string;
    updatedAt?: string;
    content?: string;
};

export class NotesInfo extends Realm.Object {
    public id: string = nanoid();
    public title: string;
    public createdAt: string;
    public updatedAt?: string;
    public content?: string;

    public static schema: Realm.ObjectSchema = {
        name: "NotesInfo",
        properties: {
            id: "string",
            title: "string",
            createdAt: "string",
            updatedAt: "string?",
            content: "string?",
        },
        primaryKey: "id",
    };

    public static generate(title: string, content?: string) {
        console.log("Schema title: ", title);
        console.log("Schema content: ", content);
        return {
            id: nanoid(),
            title,
            createdAt: new Date().toISOString(),
            updatedAt: null,
            content,
        };
    }
}

export type NotesInfoResult = Realm.Results<NotesInfo>;
