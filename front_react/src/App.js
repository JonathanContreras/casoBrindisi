import React, { useState } from "react";
// import { auth } from "./utils/FirebaseFiles/firebase";
// import { onAuthStateChanged } from "firebase/auth";

import MainPage from "./pages/MainPage";
// import LoginPage from "./pages/LoginPage";

import buildStore from "./redux/store";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const { store, persistor } = buildStore();

const App = () => {
    // const [user, setUser] = useState(null);

    // onAuthStateChanged(auth, (userData) => {
    //     console.log(userData);
    //     if (userData) {
    //         setUser(true);
    //     } else {
    //         setUser(false);
    //     }
    // });

    //return user ? <MainPage /> : <LoginPage />;
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <MainPage />
            </PersistGate>
        </Provider>
    );
};

export default App;
// <Provider store={store}>
// <PersistGate loading={null} persistor={persistor}>
//     {user ? <MainPage /> : <LoginPage />}
// </PersistGate>
// </Provider>
