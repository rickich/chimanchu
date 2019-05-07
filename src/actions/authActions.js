export const setUser = (id,token) => {
    return (dispatch, getState, { getFirebase,getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        firestore.collection('users').doc(id).set({
            token:{...token},
            createdAt: new Date(), 
        }).then(() => {
            dispatch({type: 'CREATE_USER', id });
        }).catch((err) => {
            dispatch({type: 'ERROR', err });
        })
    }
};
