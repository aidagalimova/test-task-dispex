import { combineReducers } from 'redux';
import locationsReducer from './reducers/locations';
import residentsReducer from './reducers/residents';

const rootReducer = combineReducers({
    locations: locationsReducer,
    residents: residentsReducer
});

export default rootReducer;
