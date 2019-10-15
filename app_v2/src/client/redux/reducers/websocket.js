
const initialState = {};

export default function websocketReducer (state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        default:
            return state;
    }
}