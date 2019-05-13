export const setUser = (id,token) => {
    return (dispatch, getState, { getFirebase,getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        firestore.collection('users').doc(id).set({
            token:{...token},
            daya:1000,
            createdAt: new Date(), 
        }).then(() => {
            dispatch({type: 'CREATE_USER', id });
        }).catch((err) => {
            dispatch({type: 'ERROR', err });
        })
    }
};

export const updateUser = (id,token) =>{
    return (dispatch, getState, { getFirebase,getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        firestore.collection('users').doc(id).update({
            token:{...token},
            createdAt: new Date(), 
        }).then(() => {
            dispatch({type: 'UPDATE_USER', id });
        }).catch((err) => {
            dispatch({type: 'ERROR', err });
        })
    }
}