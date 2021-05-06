import * as firebase from 'firebase';
import {STORE_REQUESTS, CLEAR_REQUESTS} from '../constants';

export const getRequests = () => {
	return async (dispatch, state) => {
		try {
			console.log('Fetch Stuff From Firebase');
		} catch (error) {
			console.log('Error:', error);
			throw error;
		}
	};
};
export const clearRequests = () => {
	return dispatch => {
		dispatch({type: CLEAR_HISTORY});
	};
};
