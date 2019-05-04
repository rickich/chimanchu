import axios from 'axios'

export function loginWithTwitch(access_token){
    return(dispatch) => {
        return axios.get('https://api.twitch.tv/helix/users',{
            headers:{'Authorization': 'Bearer '+access_token}
            }).then((response) => dispatch(parseData(access_token,response.data.data[0])));
    }
}

export function parseData(access_token,result){
    return{
        type:'LOAD_USER_DATA',
        access_token: access_token,
        user_id: result["id"],
        profile_url: result["profile_image_url"],
        display_name: result["display_name"],
    }
}