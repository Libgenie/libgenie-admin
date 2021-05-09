import {useState} from 'react';
import axios from 'axios';
const url = 'https://libgenie.netlify.app/.netlify/functions/update';
const useUpdate = () => {
	const [loading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isClicked, setIsClicked] = useState({
		issue_id: null,
		return_date: null,
	});

	useEffect(() => {
		if (isClicked.issue_id)
			createConfig(isClicked.issue_id, isClicked.return_date);
	}, [isClicked]);

	const createConfig = (issue_id, return_date) => {
		const config = {
			method: 'POST',
			baseURL: url,
			data: {
				issue_id,
				return_date,
			},
		};
		makeUpdate(config);
	};

	const makeUpdate = async config => {
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
		}
	};

	return {
		loading,
		error,
		errorMessage,
		setIsClicked,
	};
};

export default useUpdate;
