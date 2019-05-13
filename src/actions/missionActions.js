
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
export const createAddToMission = (mission,newTot) => {
    return (dispatch, getState, { getFirebase,getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        console.log(mission.total_amount)
        firestore.collection('missions').doc(mission.mission_id).update({
            total_amount: newTot,
            lastModified: new Date(),
        })
        firestore.collection('added_to_mission').add({
            ...mission,
            createdAt: new Date(), 
        }).then(() => {
            dispatch({type: 'ADDED_TO_MISSION'});
        }).catch((err) => {
            dispatch({type: 'CREATE_MISSION_ERROR', err });
        })
    }
};

export const updateMissionStatus = (mission,mID) => {
    return (dispatch, getState, { getFirebase,getFirestore }) => {
        // make async call to database
        console.log(mID)
        const firestore = getFirestore();
        firestore.collection('missions').doc(mID).update({
            status: 'current',
            lastModified: new Date(),
        })
        .then(() => {
            dispatch({type: 'UPDATE_STATUS'});
        }).catch((err) => {
            dispatch({type: 'CREATE_MISSION_ERROR', err });
        })
    }
};

export const completeMissionStatus = (mID) => {
    return (dispatch, getState, { getFirebase,getFirestore }) => {
        // make async call to database
        console.log(mID)
        const firestore = getFirestore();
        firestore.collection('missions').doc(mID).update({
            status: 'complete',
            lastModified: new Date(),
        })
        .then(() => {
            dispatch({type: 'UPDATE_STATUS'});
        }).catch((err) => {
            dispatch({type: 'CREATE_MISSION_ERROR', err });
        })
    }
};
export const discardMission = (mID) => {
    return (dispatch, getState, { getFirebase,getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        firestore.collection('missions').doc(mID).delete()
        .then(() => {
            dispatch({type: 'DELETE_MISSION'});
        }).catch((err) => {
            dispatch({type: 'CREATE_MISSION_ERROR', err });
        })
    }
};