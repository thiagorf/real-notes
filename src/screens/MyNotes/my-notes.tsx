import { FlatList, Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NoteItem } from "../../components/NoteItem";
import { NotesInfo } from "../../lib/realm/schema/NotesInfo";
import { MyNotesRouteProps } from "../../../App";
import RealmContext from "../../lib/realm/realm-context";

const { useQuery } = RealmContext;

export const MyNotes = ({ navigation }: MyNotesRouteProps) => {
    const notes = useQuery(NotesInfo);

    const handleNoteRedirect = (id: string) => {
        console.log(id);
        navigation.navigate("Notes", {
            id,
        });
    };

    if (notes.length === 0) {
        return (
            <View>
                <Text style={s.emptyNotes}>
                    it's a little empty right now, go create some notes!
                </Text>
            </View>
        );
    }

    return (
        <SafeAreaView>
            <FlatList
                data={notes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <NoteItem
                        note={item}
                        onTouchStart={() => handleNoteRedirect(item.id)}
                    />
                )}
            />
        </SafeAreaView>
    );
};

const s = StyleSheet.create({
    emptyNotes: {
        fontSize: 20,
    },
});
