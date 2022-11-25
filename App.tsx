import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MyNotes } from "./src/screens/MyNotes";
import { customOptions } from "./src/util/tab-screen-options";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
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
            </Tab.Navigator>
        </NavigationContainer>
    );
}
