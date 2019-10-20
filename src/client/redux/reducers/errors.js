import { PUT_ERROR } from '../actions/errors';

const initialState = {
    errors: []
};

export default function userReducer (state = initialState, action) {
    const { type, payload } = action;

    const newState = {...state};

    switch(type) {
        case PUT_ERROR:
            newState.errors.push(payload);
            return newState;
        default:
            return newState;
    }
}