export const loadUser = (result) => {   
    return (dispatch) =>{ 
        console.log('update action called for token: '+JSON.stringify(result));
        dispatch({type: 'LOAD_USER', result})
    };
};