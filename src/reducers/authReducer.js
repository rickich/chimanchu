
const initState = {
        displayName: "display_name",
        id:'id',
        profileUrl:'profile_url',
        access_token:'access_token'
}
const authReducer = (state = initState, action) =>{
    switch(action.type){
        case 'LOAD_USER':
        console.log('loading user data'+JSON.stringify(action.result));
            return{
                ...state,
                displayName: action.result.display_name,
                id: action.result.user_id,
                profileUrl: action.result.profile_url,
            } 

    }
    return state
}

export default authReducer