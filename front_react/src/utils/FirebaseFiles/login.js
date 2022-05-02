import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

export async function login(mail, pass) {
    let user = null;
    await signInWithEmailAndPassword(auth, mail, pass)
        .then((userCredential) => {
            // Signed in
            console.log("Login");
            user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });

    return user;
}

export const logout = async () => {
    await signOut(auth);
    console.log("Logout");
    return null;
};
