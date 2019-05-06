export const createMission = (mission) => {
    return (dispatch, getState, { getFirebase,getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        firestore.collection('missions').add({
            ...mission,
            createdAt: new Date(), 
        }).then(() => {
            dispatch({type: 'CREATE_MISSION', mission });
        }).catch((err) => {
            dispatch({type: 'CREATE_MISSION_ERROR', err });
        })
    }
};
export const createAddToMission = (mission) => {
    return (dispatch, getState, { getFirebase,getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        firestore.collection('missions').add({
            ...mission,
            createdAt: new Date(), 
        }).then(() => {
            dispatch({type: 'CREATE_MISSION', mission });
        }).catch((err) => {
            dispatch({type: 'CREATE_MISSION_ERROR', err });
        })
    }
};