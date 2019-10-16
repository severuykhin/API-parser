import {moduleName} from '../actions/cities';

export const getSelectedStack = (store) => {
    const s = {...store.getState()};
    return s[moduleName].selectedStack;
};

export const getIsActive = (store) => {
    const s = {...store.getState()};
    return s[moduleName].active;
};

export const getQuery = (store) => {
    const s = {...store.getState()};
    return s[moduleName].query;
};

export const getFilename = (store) => {
    const s = {...store.getState()};
    return s[moduleName].fileName;
};

export const getActiveCity = (store) => {
    const s = {...store.getState()};
    return s[moduleName].activeCity;
};