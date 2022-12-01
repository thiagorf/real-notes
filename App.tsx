import AppRoutes from "./src/app-routes";
import RealmContext from "./src/lib/realm/realm-context";

const { RealmProvider } = RealmContext;

export default function App() {
    return (
        <RealmProvider>
            <AppRoutes />
        </RealmProvider>
    );
}
