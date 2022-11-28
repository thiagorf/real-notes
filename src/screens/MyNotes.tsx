import { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { NoteItem } from "../components/NoteItem";
import { initRealm } from "../lib/realm/init";
import { NotesInfo, NotesInfoResult } from "../lib/realm/schema/NotesInfo";
import { cbRealm } from "../util/cb-realm";

export const MyNotes = () => {
    const [notesInfo, setNotesInfo] = useState<NotesInfoResult>();

    useEffect(() => {
        (async () => {
            const realm = await initRealm();

            cbRealm(realm, () => {
                const notes = realm.objects<NotesInfo>(NotesInfo.schema.name);
                setNotesInfo(notes);
            });
        })();
    }, []);

    if (!notesInfo) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (notesInfo.length === 0) {
        return (
            <View>
                <Text>
                    it's a little empty right now, go create some notes!
                </Text>
            </View>
        );
    }

    return (
        <ScrollView>
            {notesInfo && (
                <FlatList
                    data={notesInfo}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <NoteItem {...item} />}
                />
            )}
        </ScrollView>
    );
};
