
export const createMission = (mission) => {
    return (dispatch, getState, { getFirebase,getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        firestore.collection('users').doc(mission.from_id).get().then((doc)=>{
            if (!doc.exists) {
                throw "Document does not exist!";
            }
            console.log(doc)
            var newDaya = doc.data().daya - mission.amount;
            firestore.collection('users').doc(mission.from_id).update({
                daya: newDaya,
            })
        })

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
        firestore.collection('users').doc(mission.from_id).get().then((doc)=>{
            if (!doc.exists) {
                throw "Document does not exist!";
            }
            console.log(doc)
            var newDaya = doc.data().daya - mission.amount;
            firestore.collection('users').doc(mission.from_id).update({
                daya: newDaya,
            })
        })

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

export const updateMissionStatus = (mID) => {
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

export const completeMissionStatus = (mID,mission) => {
    return (dispatch, getState, { getFirebase,getFirestore }) => {
        // make async call to database
        console.log(mission.to_id)
        const firestore = getFirestore();
        firestore.collection('users').doc(mission.to_id).get().then((doc)=>{
            if (!doc.exists) {
                throw "Document does not exist!";
            }
            console.log('updating!')
            var newDaya = parseInt(doc.data().daya) + parseInt(mission.total_amount);
            console.log(newDaya)
            firestore.collection('users').doc(mission.to_id).update({
                daya: newDaya,
            })
        })


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
export const discardMission = (mID,mission,addedMissions) => {
    return (dispatch, getState, { getFirebase,getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
            
        //added 다 돌려줘
        //본주 다시 줘
        firestore.collection('missions').doc(mID).delete()
        .then(() => {
            dispatch({type: 'DELETE_MISSION'});
        }).catch((err) => {
            dispatch({type: 'CREATE_MISSION_ERROR', err });
        })
    }
};