import React, {useEffect, useState} from 'react';
import {AntDesign} from '@expo/vector-icons';
import {
	Text,
	View,
	Alert,
	ActivityIndicator,
	ImageBackground,
	FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getRequests, clearRequests} from '../store/actions/request';
import {logoutUser} from '../store/actions/auth';
import styles from './pendingstyles';
import Card from '../components/Card';
import NoData from '../assets/defaultPending';

const Pending = props => {
	const dispatch = useDispatch();
	const pending = useSelector(state => state.requests.pending);

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	// console.log('Hi I am Pending Array', pending);
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

	const handleLogout = async () => {
		try {
			await dispatch(logoutUser());
			dispatch(clearRequests());
		} catch (err) {
			console.log('Error while logging out', err);
			console.log(err);
		} finally {
			props.navigation.navigate('SignInScreen');
		}
	};

	const promptLogout = () => {
		Alert.alert('Warning!', 'Are you sure you want to logout?', [
			{
				text: 'Yes',
				onPress: handleLogout,
			},
			{
				text: 'Cancel',
				onPress: () => {
					console.log('Logout Op Cancelled');
				},
			},
		]);
	};

	if (isLoading)
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<ActivityIndicator size='large' color='#f9a826' />
			</View>
		);

	return (
		<ImageBackground
			source={require('../assets/history-bg.png')}
			style={styles.screen}>
			<View style={styles.headerContainer}>
				<Text style={styles.header}>Pending</Text>
				<AntDesign
					name='logout'
					size={25}
					color='white'
					onPress={promptLogout}
				/>
			</View>

			<View style={styles.cardContainer}>
				{/* Book Details */}
				{pending.length > 0 ? (
					<FlatList
						data={pending}
						keyExtractor={pendingItem => pendingItem.request_id}
						renderItem={({item}) => <Card item={item} />}
					/>
				) : (
					<View
						style={{
							alignItems: 'center',
							justifyContent: 'center',
							flex: 1,
							marginTop: 100,
						}}>
						<NoData />
						<Text
							style={{
								marginTop: 20,
								fontSize: 15,
								fontFamily: 'Lato_400Regular',
								opacity: 0.5,
							}}>
							There aren't any pending requests...
						</Text>
					</View>
				)}
			</View>
		</ImageBackground>
	);
};

export default Pending;
