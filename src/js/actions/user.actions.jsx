import { userConstants } from "../constants/user.constants";
import { runAction, timestamps } from "../helpers/utils";


const createUser = (name) => {
  return async (dispatch, {}, {getFirestore}) => {

    dispatch(runAction(userConstants.CREATE_USER_REQUEST, { name }));
        const firestore = getFirestore();
        const data = {
            name: name,
            avatar: 'https://ui-avatars.com/api/?background=random&name='+name,
            ...timestamps()
        }

        firestore.collection('users').add(data).then((res) => {
            let user = data;
            user.id = res.id;

            dispatch(runAction(userConstants.CREATE_USER_SUCCESS, { user }));
            localStorage.setItem('userId', user.id);

        }).catch((error) => {
            dispatch(runAction(userConstants.CREATE_USER_FAILURE, { error }));
        })
  };
};

const getUser = (id) => {
    return async (dispatch, {}, {getFirestore}) => {
  
        dispatch(runAction(userConstants.GET_USER_REQUEST));
        const firestore = getFirestore();

        const doc = await firestore.collection('users').doc(id).get();
        if(doc.exists) {
        let user = doc.data();
        user.id = doc.id; 
        dispatch(runAction(userConstants.GET_USER_SUCCESS, { user }));
        } else {
        dispatch(runAction(userConstants.GET_USER_FAILURE));
        localStorage.removeItem('userId');
        }
    };
};

const getAdmin = () => {
    return async (dispatch, {}, {getFirestore}) => {
  
        dispatch(runAction(userConstants.GET_ADMIN_REQUEST));
        const firestore = getFirestore();

        const doc = await firestore.collection('users').doc(process.env.ADMIN).get();
        if(doc.exists) {
        let admin = doc.data();
        admin.id = doc.id; 
        dispatch(runAction(userConstants.GET_ADMIN_SUCCESS, { admin }));
        } else {
        dispatch(runAction(userConstants.GET_ADMIN_FAILURE));
        }
    };
};

export const userActions = {
  createUser,
  getUser,
  getAdmin
};
