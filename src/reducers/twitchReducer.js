
const initState = {
        displayName: "display_name",
        profile_image_url:'profileimgage',
        followingStreamers:[],
}
const twitchReducer = (state = initState, action) =>{
    switch(action.type){
        case 'LOAD_USER':
        console.log('loading all data')
            return {
                ...state,
                displayName: action.userData.display_name,
                profile_image_url: action.userData.profile_image_url,
                followingStreamers:[...action.followingStreamersData]
            };
        
        default:
            return state;

    }
}

export default twitchReducer