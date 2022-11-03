
import { messageConstants } from '../constants';

const initialState = { messageList: [], writers: {} };

export function message(state = initialState, action) {
    switch(action.type) {
        case messageConstants.GET_MESSAGE_REQUEST:
        case messageConstants.GET_MESSAGE_FAILURE:
            return {
                messageList: [],
                writers: state.writers
        }
        case messageConstants.CREATE_MESSAGE_SUCCESS:
        case messageConstants.CREATE_MESSAGE_REQUEST:
        case messageConstants.CREATE_MESSAGE_FAILURE:
            return {
                messageList: state.messageList,
                writers: state.writers
        }
        case messageConstants.GET_MESSAGE_SUCCESS:
            return {
                messageList: action.messageList,
                writers: state.writers
        }
        case messageConstants.SET_TYPING_REQUEST:
        case messageConstants.SET_TYPING_FAILURE:
        case messageConstants.SET_TYPING_SUCCESS:
            return {
                messageList: state.messageList,
                writers: state.writers
        }
        case messageConstants.LISTEN_TYPING_REQUEST:
        case messageConstants.LISTEN_TYPING_FAILURE:
            return {
                messageList: state.messageList,
                writers: {}
        }
        case messageConstants.LISTEN_TYPING_SUCCESS:
            return {
                messageList: state.messageList,
                writers: action.writers
        }
        default:
            return state;
    }
}