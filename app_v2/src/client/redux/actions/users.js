export const moduleName = 'users';
export const SET_USERS = `${moduleName}/SET_USERS`;

export const setUsers = (users) => ({
    type : SET_USERS,
    payload : users
});