import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { MyNotes } from "./screens/MyNotes";
import { customOptions } from "./util/tab-screen-options";
import { Notes } from "./screens/Notes";
import { Settings } from "./screens/Settings";
import { PASTEL_COLORS } from "./global/colors";

type RouteParams = {
    MyNotes: undefined;
    Notes: { id?: string };
    Settings: undefined;
};

export type NotesRouteProps = BottomTabScreenProps<RouteParams, "Notes">;
export type MyNotesRouteProps = BottomTabScreenProps<RouteParams, "MyNotes">;

const Tab = createBottomTabNavigator<RouteParams>();

const AppRoutes = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="MyNotes"
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: PASTEL_COLORS.PEACH,
                    },
                    tabBarIconStyle: {
                        color: "#6e6e6e",
                    },
                    tabBarActiveTintColor: "#1d1d1d",
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
                        tabBarStyle: {
                            display: "none",
                        },
                        unmountOnBlur: true,
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                        ...customOptions({
                            iconName: "setting",
                            labelName: "settings",
                        }),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppRoutes;
