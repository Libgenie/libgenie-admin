import { STORE_REQUESTS, CLEAR_REQUESTS } from '../constants';

const initialState = { pending: [], ready: [], issued: [] };

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_REQUESTS:
      const pending = [];
      const ready = [];
      const issued = [];
      console.log('This is the whole request array', action.payload);
      console.log('I am pending before foreach', pending);
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

      console.log('I am final pending array', pending);
      console.log('I am final ready array', ready);
      return { pending, ready, issued };
    case CLEAR_REQUESTS:
      return initialState;

    default:
      return state;
  }
};

export default requestReducer;
