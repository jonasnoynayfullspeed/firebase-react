import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import firebase from './firebase';
import { createLogger } from 'redux-logger';
import { reduxFirestore, getFirestore } from 'redux-firestore'

const loggerMiddleware = createLogger();

export const store = createStore (
    rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirestore}), loggerMiddleware),
        reduxFirestore(firebase)
    )
);