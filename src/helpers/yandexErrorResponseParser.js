export default function errorResponseParser(error, apiContext) {
    let errorText = error.toString();
    if (errorText === 'Error: Request failed with status code 403') {
        return {
            type: 'error-access',
            data: {
                text: 'Ошибка доступа ключа API. Активный ключ изменен',
                key: apiContext.keysManager.getActiveKey()
            }
        }
    }
}