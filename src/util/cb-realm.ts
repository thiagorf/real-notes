import Realm from "realm";

export const cbRealm = (realm: Realm, cb: () => unknown) => {
    try {
        realm.write(cb);
    } catch (e) {
        console.error(e);
    } finally {
        realm.close();
    }
};
