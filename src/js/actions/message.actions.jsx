import { messageConstants } from "../constants/message.constants";
import { runAction, timestamps } from "../helpers/utils";


const createMessage = (data) => {
  return async (dispatch, {}, {getFirestore}) => {

    dispatch(runAction(messageConstants.CREATE_MESSAGE_REQUEST));
        const firestore = getFirestore();

        const newData = { ...data, ...timestamps() }
    
        firestore.collection('messages').add(newData).then((res) => {
            
            dispatch(runAction(messageConstants.CREATE_MESSAGE_SUCCESS));

        }).catch((error) => {
            dispatch(runAction(messageConstants.CREATE_MESSAGE_FAILURE, { error }));
        })
  };
};

const getMessageList = () => {
    return async (dispatch, {}, {getFirestore}) => {
  
        dispatch(runAction(messageConstants.GET_MESSAGE_REQUEST));
        const firestore = getFirestore();
        
        firestore.collection('messages').orderBy("updatedAt", "asc").onSnapshot(snap => {
            let messageList = [];

            snap.docs.map((doc) => {
                if(doc.exists) {

                    let data = doc.data();
                    data.id = doc.id;

                    messageList.push(data);
                }
            });

            dispatch(runAction(messageConstants.GET_MESSAGE_SUCCESS, { messageList }));
          });
    };
};

const listenTyping  = () => {
    return async (dispatch, {}, {getFirestore}) => {
        dispatch(runAction(messageConstants.LISTEN_TYPING_REQUEST));
        const firestore = getFirestore();
        
        firestore.collection('typing').onSnapshot(snap => {
            let typing = null;
    
            snap.docs.map((doc) => {
                if(doc.exists) {
    
                    let data = doc.data();
                    data.id = doc.id;
    
                    typing = data;
                }
            });
    
            dispatch(runAction(messageConstants.LISTEN_TYPING_SUCCESS, { writers: typing.writers }));
        });
    }
}

const setTyping = (writers) => {
    return async (dispatch, {}, {getFirestore}) => {
  
        dispatch(runAction(messageConstants.SET_TYPING_REQUEST));
        const firestore = getFirestore();

        const querySnapshot = await firestore.collection('typing').limit(1).get();
        if(querySnapshot.docs.length > 0) {
            const settings = querySnapshot.docs[0];

            await firestore.collection('typing').doc(settings.id).update({ writers });
            dispatch(runAction(messageConstants.SET_TYPING_SUCCESS));
        }
    };
};

export const messageActions = {
    createMessage,
    getMessageList,
    listenTyping,
    setTyping,
};
