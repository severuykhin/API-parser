import * as CONSTATNS from '../common/errors/CONSTATNS'; 

/**
 * @todo - перенести все вохвращаемые знаяения в schemas 
 */
export default function errorResponseParser(error, apiContext) {

    if (!error.response) {
        return {
            type: CONSTATNS.ERROR_REQUEST,
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
            type: CONSTATNS.ERROR_ACCESS,
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
            type: CONSTATNS.ERRPR_SERVER,
            status: errorStatus,
            isAccessError: false,
            data: {
                text: 'Ошибка сервера',
                city: apiContext.city
            }
        }
    }

}