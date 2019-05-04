export const createMission = (mission) => {
    return (dispatch, getState) => {
        // make async call to database
        dispatch({type: 'CREATE_MISSION', mission});
    }
};
