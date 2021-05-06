import {createStore, combineReducers, applyMiddleware} from 'redux';
import authReducer from './reducers/authReducer';
import requestReducer from './reducers/requestReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
	auth: authReducer,
	requests: requestReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
