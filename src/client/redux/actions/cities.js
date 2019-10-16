export const moduleName            = 'CITIES';
export const ADD_CITIES            = `${moduleName}:ADD_CITIES`;
export const REMOVE_CITIES         = `${moduleName}:REMOVE_CITIES`;
export const PUT_START_PARSING     = `${moduleName}:PUT_START_PARSING`;
export const PUT_PAUSE_PARSING     = `${moduleName}:PUT_PAUSE_PARSING`;
export const PUT_CONTINUE_PARSING  = `${moduleName}:PUT_CONTINUE_PARSING`;
export const PUT_STOP_PARSING      = `${moduleName}:PUT_STOP_PARSING`;
export const PUT_SELECTED_STACK    = `${moduleName}:PUT_SELECTED_STACK`;
export const PUT_QUERY             = `${moduleName}:PUT_QUERY`;
export const PUT_FILENAME          = `${moduleName}:PUT_FILENAME`;
export const PUT_ACTIVE_CITY       = `${moduleName}:PUT_ACTIVE_CITY`;
export const PUT_CITY_UPDATE       = `${moduleName}:PUT_CITY_UPDATE`;


export const putQuery = (query) => {
    return {
        type: PUT_QUERY,
        payload: query
    }
}

export const putFilename = (filename) => {
    return {
        type: PUT_FILENAME,
        payload: filename
    }
}

export const addCities = (cities) => {
    return {
        type: ADD_CITIES,
        payload: cities
    }
}

export const putActiveCity = (city) => {
    return {
        type: PUT_ACTIVE_CITY,
        payload: city
    }
}

export const removeCities = (cities) => {
    return {
        type: REMOVE_CITIES,
        payload: cities
    }
}

export const putStartParsing = () => {
    return {
        type: PUT_START_PARSING,
    };
};

export const putContinueParsing = () => {
    return {
        type: PUT_CONTINUE_PARSING,
    };
};

export const putPauseParsing = () => {
    return {
        type: PUT_PAUSE_PARSING
    };
};

export const putStopParsing = () => {
    return {
        type: PUT_STOP_PARSING
    };
};

export const putSelectedStack = (stack) => {
    return {
        type: PUT_SELECTED_STACK,
        payload: stack
    };
};

export const putCityUpdate = ({id, count}) => {
    return {
        type: PUT_CITY_UPDATE,
        payload: {id, count}
    };
}