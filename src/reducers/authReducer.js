const initState = {
    user: {
        displayName: "display_name",
        id:'id',
        profileUrl:'profile_url',
        access_token:'access_token'
    },
}
const authReducer = (state = initState, action) =>{
    switch(action.type){
        case 'LOAD_USER_DATA':
            
            console.log('creating Mission'+JSON.stringify(action.mission))
    }
    return state
}

export default authReducer