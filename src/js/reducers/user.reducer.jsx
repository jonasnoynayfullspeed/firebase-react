
import { userConstants } from '../constants';

const initialState = { userList: [], user: null, admin: null };

export function user(state = initialState, action) {
    switch(action.type) {
        case userConstants.LIST_USERS_REQUEST:
        case userConstants.LIST_USERS_FAILURE:
            return {
                user: state.user,
                userList: [],
                admin: state.admin
        }
        case userConstants.LIST_USERS_SUCCESS:
            return {
                user: state.user,
                userList: action.data,
                admin: state.admin
        }
        case userConstants.CREATE_USER_REQUEST:
        case userConstants.CREATE_USER_FAILURE:
        case userConstants.GET_USER_REQUEST:
        case userConstants.GET_USER_FAILURE:
            return {
                user: null,
                userList: state.userList,
                admin: state.admin
        }
        case userConstants.CREATE_USER_SUCCESS:
        case userConstants.GET_USER_SUCCESS:
            return {
                user: action.user,
                userList: state.userList,
                admin: state.admin
        }
        case userConstants.GET_ADMIN_REQUEST:
        case userConstants.GET_ADMIN_FAILURE:
            return {
                user: state.user,
                userList: state.userList,
                admin: null
        }
        case userConstants.GET_ADMIN_SUCCESS:
            return {
                user: state.user,
                userList: state.userList,
                admin: action.admin
        }
        default:
            return state;
    }
}