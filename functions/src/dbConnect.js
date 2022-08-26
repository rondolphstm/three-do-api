import { initializeApp, cert, getApps } from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import { credentials } from "../credentials.js";

export default function dbConnect() {
//   returns an array of all of the Firebase service (e.g Firestore) 
    if(!getApps().length) {

        initializeApp({
            credential: cert(credentials)
        });
    } 
    return getFirestore();
}