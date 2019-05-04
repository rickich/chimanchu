import missionReducer from './missionReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    mission: missionReducer,
});

export default rootReducer; 