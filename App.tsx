import AppRoutes from "./src/app-routes";
import RealmContext from "./src/lib/realm/realm-context";
import { useFonts } from "expo-font";

const { RealmProvider } = RealmContext;

export default function App() {
    const [isFontLoaded] = useFonts({
        Jost: require("./assets/fonts/Jost-VariableFont_wght.ttf"),
        Lato: require("./assets/fonts/Lato-Regular.ttf"),
        Merriweather: require("./assets/fonts/Merriweather-Regular.ttf"),
        Montserrat: require("./assets/fonts/Montserrat-VariableFont_wght.ttf"),
        NerkoOne: require("./assets/fonts/NerkoOne-Regular.ttf"),
        PlayfairDisplay: require("./assets/fonts/PlayfairDisplay-VariableFont_wght.ttf"),
    });

    if (!isFontLoaded) {
        return null;
    }

    return (
        <RealmProvider>
            <AppRoutes />
        </RealmProvider>
    );
}
