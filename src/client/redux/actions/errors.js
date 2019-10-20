export const moduleName = 'errors';
export const PUT_ERROR = `${moduleName}/PUT_ERROR`;

export const putError = (error) => ({
    type : PUT_ERROR,
    payload : error
});