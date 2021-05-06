import {STORE_REQUESTS, CLEAR_REQUESTS} from '../constants';

const initialState = [];

const requestReducer = (state = initialState, action) => {
	switch (action.type) {
		case STORE_REQUESTS:
			return action.payload;
		case CLEAR_REQUESTS:
			return initialState;

		default:
			return state;
	}
};

export default requestReducer;
