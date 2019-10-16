import { SET_USERS } from '../actions/users';

const initialState = [];

export default function userReducer (state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case SET_USERS:
            return [...payload];
        default:
            return state;
    }
}