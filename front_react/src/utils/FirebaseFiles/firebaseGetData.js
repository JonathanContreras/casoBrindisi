import firebase from "./firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

const db = getFirestore(firebase);

export const getFirebaseData = async (nameCollection) => {
    const dataColection = collection(db, nameCollection);
    const dataColectionSnapshot = await getDocs(dataColection);
    return dataColectionSnapshot.docs.map((doc) => {
        return { ...doc.data(), firebaseId: doc.id };
    });
};
