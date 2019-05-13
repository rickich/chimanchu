
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
        case 'ADDED_TO_MISSION':
            return state;
        case 'UPDATE_STATUS':
        return state;
        case 'DELETE_MISSION':
        return state;
        default:
            return state;
    }
}

export default missionReducer