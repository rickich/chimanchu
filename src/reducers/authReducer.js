
const initState = {
        id:'id',
}
const authReducer = (state = initState, action) =>{
    switch(action.type){
        case 'CREATE_USER':
            return {
                ...state,
                id: action.id
            };
        default:
            return state;

    }
}

export default authReducer