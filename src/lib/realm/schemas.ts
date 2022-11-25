export const NotesInfo = {
    name: "NotesInfo",
    properties: {
        id: "string",
        title: "string",
        createdAt: "date",
        updatedAt: "date?",
        content: "Note",
    },
};

export const Note = {
    name: "Note",
    properties: {
        content: "string",
    },
};
