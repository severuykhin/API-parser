import * as CONSTATNS from './CONSTATNS'; 

export const errorAllKeysExpired = () => {
    return {
        type: CONSTATNS.ERROR_KEYS_EXPIRED,
        status: 403,
        isAccessError: true,
        data: {
            text: 'Ошибка доступа к API. Превышен лимит запросов для всех ключей',
        }
    }
} 