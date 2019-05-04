export const createMission = (mission) => {
    return (dispatch, getState, { getFirebase,getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        firestore.collection('missions').add({
            ...mission,
            to_id: 138009898,
            from_id: 222222,
            createdAt: new Date(), 
        }).then(() => {
            dispatch({type: 'CREATE_MISSION', mission });
        }).catch((err) => {
            dispatch({type: 'CREATE_MISSION_ERROR', err });
        })
    }
};
