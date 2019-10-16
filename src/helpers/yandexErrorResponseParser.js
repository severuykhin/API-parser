export default function errorResponseParser(error, apiContext) {

    if (!error.response) {
        return {
            type: 'error-request',
            status: 500,
            isAccessError: false,
            data: {
                text: 'Непредвиденная ошибка',
                city: apiContext.city
            }
        }
    }

    let errorStatus = error.response.status;

    if (errorStatus === 403) {
        return {
            type: 'error-access',
            status: errorStatus,
            isAccessError: true,
            data: {
                text: 'Ошибка доступа ключа API. Активный ключ изменен',
                key: apiContext.keysManager.getActiveKey()
            }
        }
    }

    if (errorStatus === 500) {
        return {
            type: 'error-server',
            status: errorStatus,
            isAccessError: false,
            data: {
                text: 'Ошибка сервера',
                city: apiContext.city
            }
        }
    }

}