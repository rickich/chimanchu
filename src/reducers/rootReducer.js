import missionReducer from './missionReducer';
import {combineReducers} from 'redux';
import authReducer from './authReducer';
import {firestoreReducer} from 'redux-firestore';
import twitchReducer from './twitchReducer';

const rootReducer = combineReducers({
    mission: missionReducer,
    auth:authReducer,
    firestore: firestoreReducer,
    twitch:twitchReducer,
});

export default rootReducer; 