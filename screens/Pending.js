import React, {useEffect, useState} from 'react';
import {Text, View, Alert, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getRequests} from '../store/actions/request';

const Pending = () => {
	const dispatch = useDispatch();
	const pending = useSelector(state => state.requests.pending);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	console.log('Pending', pending);
	useEffect(() => {
		try {
			setIsLoading(true);
			const unsubscribe = dispatch(getRequests(setIsLoading, setError));
			return unsubscribe;
		} catch (err) {
			console.log(err);
		}
	}, [dispatch]);

	useEffect(() => {
		if (error) {
			Alert.alert('Error!', 'Oops! Something Went Wrong! Try Again Later!', [
				{
					text: 'Ok',
					onPress: () => {
						console.log('Alerted!');
						setError(false);
					},
				},
			]);
		}
	}, [error.status]);

	if (isLoading)
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<ActivityIndicator size='large' color='#00ff00' />
			</View>
		);

	if (pending.length === 0)
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<Text>No Pending Status to Show</Text>
			</View>
		);

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Text>Pending UI</Text>
		</View>
	);
};

export default Pending;
