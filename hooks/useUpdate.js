import {useState} from 'react';
import axios from 'axios';
const url = 'https://libgenie.netlify.app/.netlify/functions/update';
const useUpdate = (issue_id, return_date = 'undefined') => {
	const [loading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const config = {
		method: 'POST',
		baseURL: url,
		data: {
			issue_id,
			return_date,
		},
	};

	const makeUpdate = async () => {
		try {
			setIsLoading(true);
			const response = await axios(config);
			console.log(response.data.body);
		} catch (err) {
			setError(true);
			setErrorMessage(err.response.body);
			console.log(err.response.body);
		} finally {
			setIsLoading(false);
			setError(false);
			return {
				loading,
				error,
				errorMessage,
			};
		}
	};

	makeUpdate();
};

export default useUpdate;
