import {STORE_REQUESTS, CLEAR_REQUESTS} from '../constants';

const initialState = {pending: [], ready: [], issued: []};

const requestReducer = (state = initialState, action) => {
	switch (action.type) {
		case STORE_REQUESTS:
			const pending = [];
			const ready = [];
			const issued = [];
			action.payload.forEach(request => {
				switch (request.status) {
					case 3:
						pending.push(request);
						break;

					case 2:
						ready.push(request);
						break;

					case 1:
						issued.push(request);
						break;
				}
			});
			return {pending, ready, issued};
		case CLEAR_REQUESTS:
			return initialState;

		default:
			return state;
	}
};

export default requestReducer;
