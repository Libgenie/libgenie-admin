import * as firebase from 'firebase';
import {STORE_REQUESTS, CLEAR_REQUESTS} from '../constants';

export const getRequests = setIsLoading => {
	return dispatch => {
		const db = firebase.firestore();
		try {
			const requests = [];
			const unsubscribe = db.collection('requests').onSnapshot(
				snapshot => {
					snapshot.forEach(result => {
						requests.push({
							request_id: result.id,
							...result.data(),
						});
					});
					dispatch({
						type: STORE_REQUESTS,
						payload: requests,
					});
					setIsLoading(false);
				},
				err => {
					console.log('Snapshot Errored Out');
				}
			);
			return unsubscribe;
		} catch (error) {
			console.log('Error over here:', error);
			throw error;
		}
	};
};
export const clearRequests = () => {
	return dispatch => {
		dispatch({type: CLEAR_HISTORY});
	};
};
