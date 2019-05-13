
const initState = {
        displayName: "display_name",
        profile_image_url:'profileimgage',
        id: 'uid',
        followingStreamers:[],
}
const twitchReducer = (state = initState, action ) =>{
    switch(action.type){
        case 'LOAD_USER':
        console.log(action.userData)
            return {
                ...state,
                displayName: action.userData.display_name,
                profile_image_url: action.userData.profile_url,
                id:action.userData.id
            };
        case 'LOAD_FOLLOWING':
                return {
                    ...state,
                    followingStreamers:[...action.followingStreamersData]
                };
        
        default:
            return state;

    }
}

export default twitchReducer