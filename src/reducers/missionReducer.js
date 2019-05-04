const initState = {
    missions: {
        'abc': {
            amount: '155',
            detail: 'mission detail provided here',
            from_id: '1234567',
            status: 'pending',
            title: 'Chimanchu first mission',
            to_id: '49233748'   
        },
        'acc': {
            amount: '44',
            detail: 'mission detail provided here',
            from_id: '1234567',
            status: 'current',
            title: 'Chimanchu second mission',
            to_id: '49233748'   
        },
        'bbc': {
            amount: '155',
            detail: 'mission detail provided here',
            from_id: '1234567',
            status: 'pending',
            title: 'Chimanchu third mission',
            to_id: '9999999'   
        }
    }
    
}
const missionReducer = (state = initState, action) =>{
    return state
}

export default missionReducer