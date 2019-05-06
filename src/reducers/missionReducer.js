import { database } from "firebase";

const initState = {
    amount: '155',
    detail: 'mission detail provided here',
    from_id: '1234567',
    status: 'pending',
    title: 'Chimanchu first mission',
    to_id: '49233748'   
    
}
const missionReducer = (state = initState, action) =>{
    switch(action.type){
        case 'CREATE_MISSION':
            console.log('mission Created')
            return state;
        case 'CREATE_MISSION_ERROR':
            console.log ('creatMission error', action.err);
            return state;
        case 'UPDATE_MISSION_DETAIL':
            return{
                ...state,
                ...action.data
            }
        default:
            return state;
    }
}

export default missionReducer