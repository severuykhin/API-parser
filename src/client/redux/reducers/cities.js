import bigCities from '../../../data/cities-1.json'
import smallCities from '../../../data/cities-2.json'

import { 
  ADD_CITIES, 
  REMOVE_CITIES,
  PUT_START_PARSING,
  PUT_STOP_PARSING,
  PUT_PAUSE_PARSING,
  PUT_SELECTED_STACK,
  PUT_QUERY,
  PUT_FILENAME,
  PUT_ACTIVE_CITY,
  PUT_CITY_UPDATE
} from '../actions/cities'

const allCities = [ ...bigCities.cities ];

smallCities.cities.forEach( city => {
  let inAllCities = allCities.filter( item => city.name === item.name);
  if (inAllCities.length <= 0) allCities.push(city);
});

allCities.sort((a, b) => {
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  return 0;
});

/**
 * @todo - Stack везде переименовать в Queue
 */
const initialState = {
    sourceCities: allCities,
    selectedCities: [],
    selectedStack: [],
    activeCity: null,
    active: false,
    query: '',
    fileName: ''
};

export default function citiesReducer (state = initialState, action) {
    const { type, payload } = action;

    const newState = Object.assign({}, state);

    switch(type) {
        case ADD_CITIES:
            const newSelectedCities = [...state.selectedCities];
            const newSelectedStack  = [...state.selectedStack];
            const newSelectedCitiesIds = newSelectedCities.map(city => city.id);
            const newSelectedCitiesStackIds = newSelectedStack.map(city => city.id);

            payload.forEach(city => {
              if (newSelectedCitiesIds.indexOf(city.id) === -1) 
                newSelectedCities.push({...city});
              if (newSelectedCitiesStackIds.indexOf(city.id) === -1)
                newSelectedStack.push({...city})
            });

            newState.selectedCities = newSelectedCities;
            newState.selectedStack = newSelectedStack;

            return newState;

        case REMOVE_CITIES:
            const ids = payload.map(city => city.id); 
            newState.selectedCities = newState.selectedCities.filter(city => ids.indexOf(city.id) === -1);
            newState.selectedStack = [...newState.selectedCities];
            return newState;

        case PUT_START_PARSING:
            newState.active = true;
            return newState;

        case PUT_PAUSE_PARSING:
            newState.active = false;
            return newState;

        case PUT_STOP_PARSING:
            newState.active = false;
            newState.selectedCities = [];
            newState.selectedStack = [];
            newState.activeCity = null;
            return newState;

        case PUT_SELECTED_STACK:
            newState.selectedStack = [...payload];
            return newState;
          
        case PUT_QUERY:
          newState.query = payload;
          return newState;

        case PUT_FILENAME:
            newState.fileName = payload;
            return newState;
        
        case PUT_ACTIVE_CITY:
            newState.activeCity = payload;
            return newState;
        
        case PUT_CITY_UPDATE:
            newState.selectedCities.forEach(item => {
              if (item.id === payload.id) item.count = payload.count; 
            });

            return newState;
        
        default:
            return state;
    }
}