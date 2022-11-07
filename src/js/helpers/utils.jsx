import firebase from "firebase/app";
import 'firebase/firestore';

export const runAction = (actionType, value) => {
    return { type: actionType, ...value };
};

export const getData = (doc) => {
    return { id: doc.id };
}

export const getAvatar = (name) => {
    return 'https://ui-avatars.com/api/?background=random&name=' + name;
}

export const timestamps = () => {
    return {
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    }
}