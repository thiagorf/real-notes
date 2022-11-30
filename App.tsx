import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MyNotes } from "./src/screens/MyNotes";
import { customOptions } from "./src/util/tab-screen-options";
import { Notes } from "./src/screens/Notes";
import { CreateNoteHeader } from "./src/components/CreateNoteHeader";
import RealmContext from "./src/lib/realm/realm-context";

const { RealmProvider } = RealmContext;

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <RealmProvider>
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName="MyNotes"
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Tab.Screen
                        name="MyNotes"
                        component={MyNotes}
                        options={{
                            ...customOptions({
                                iconName: "bars",
                                labelName: "notes",
                            }),
                        }}
                    />
                    <Tab.Screen
                        name="Notes"
                        component={Notes}
                        options={{
                            ...customOptions({
                                iconName: "form",
                                labelName: "new note",
                            }),
                            headerShown: true,
                            headerTitle: () => <CreateNoteHeader />,
                            tabBarStyle: {
                                display: "none",
                            },
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </RealmProvider>
    );
}
