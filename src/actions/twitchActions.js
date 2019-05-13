export const loadTwitchData = (userData, followingStreamersData) => {
    console.log('loading all data')
    return (dispatch) => {
        dispatch({type: 'LOAD_USER', userData });
        dispatch({type: 'LOAD_FOLLOWING', followingStreamersData });
    }
};

