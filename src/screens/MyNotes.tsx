import { ScrollView } from "react-native";
import { NoteItem } from "../components/NoteItem";

const times = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

export const MyNotes = () => {
    return (
        <ScrollView>
            {times.map((x) => (
                <NoteItem key={x} />
            ))}
        </ScrollView>
    );
};
