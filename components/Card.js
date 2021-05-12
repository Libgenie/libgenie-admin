import React, {useEffect, useState} from 'react';
import useUpdate from '../hooks/useUpdate';
import {
	View,
	Text,
	Alert,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';
import styles from '../screens/pendingstyles';
import * as firebase from 'firebase';
// import Returned from '../assets/Returned';

const CardText = ({header, value, color}) => {
	return (
		<View style={styles.dateContainer}>
			<View
				style={{
					width: 10,
					height: 10,
					borderRadius: 10,
					marginHorizontal: 5,
					backgroundColor: color,
					opacity: 0.6,
				}}
			/>
			<Text style={styles.date}>{`${header}: ${value}`}</Text>
		</View>
	);
};

const Card = ({item}) => {
	const {loading, error, errorMessage, setIsClicked, setError} = useUpdate();
	const [student, setStudent] = useState(null);
	let btnColor = '';
	let btn = '';
	if (item.status === 3) {
		btnColor = '#f9a826';
	} else if (item.status === 2) {
		btnColor = '#00B7FF';
	} else if (item.status === 1) {
		if (new Date(item.return_date) < new Date()) {
			btnColor = '#c90411';
			btn = 'Running Late';
		} else {
			btnColor = '#33af85';
			btn = 'Accept Return';
		}
	}

	useEffect(() => {
		if (error) {
			Alert.alert('Error!', errorMessage, [
				{
					text: 'Ok',
					onPress: () => {
						console.log('Alerted!');
						setError(false);
					},
				},
			]);
		}
	}, [error]);

	useEffect(() => {
		const fetchStudent = async () => {
			const db = firebase.firestore();
			const studentDoc = await db
				.collection('users')
				.doc(item.student_uid)
				.get();
			setTimeout(() => {
				setStudent(studentDoc.data());
			}, 1000);
		};
		fetchStudent();
	}, []);

	const handleClick = () => {
		console.log('Clicked!');
		setIsClicked({
			issue_id: item.request_id,
			return_date: '2021-05-15T18:29:59.000Z',
		});
	};
	return (
		<View style={styles.subCardContainer}>
			<View style={{width: '100%'}}>
				<Text style={styles.bookName} numberOfLines={1}>
					{item.name.charAt(0).toUpperCase() + item.name.substring(1)}
				</Text>

				<CardText header='Author' value={item.author} color={btnColor} />
				<CardText header='Edition' value={item.edition} color={btnColor} />

				{item.pickup_date && (
					<CardText
						header='Pickup Date'
						value={new Date(item.pickup_date).toDateString()}
						color={btnColor}
					/>
				)}
				{item.return_date && (
					<CardText
						header='Return Date'
						value={new Date(item.return_date).toDateString()}
						color={btnColor}
					/>
				)}

				{!student ? (
					<View>
						<ActivityIndicator
							size='large'
							color={
								item.status === 3
									? '#f9a826'
									: item.status === 2
									? '#00B7FF'
									: '#33af85'
							}
						/>
					</View>
				) : (
					<View>
						<CardText
							header='College Id'
							value={student.college_id}
							color={btnColor}
						/>
						<CardText
							header='Name'
							value={student.display_name}
							color={btnColor}
						/>
						<CardText header='Stream' value={student.stream} color={btnColor} />
						<CardText
							header='Semester'
							value={student.semester}
							color={btnColor}
						/>
					</View>
				)}

				<View
					style={{
						width: '100%',
						borderWidth: 1,
						marginVertical: 20,
						opacity: 0.2,
					}}></View>
				<View>
					<TouchableOpacity
						onPress={handleClick}
						disabled={loading}
						activeOpacity={0.6}>
						<View
							style={{
								marginBottom: 10,
								backgroundColor: btnColor,
								borderRadius: 12,
								padding: 12,
								elevation: 6,
							}}>
							{!loading ? (
								<Text
									style={{
										textAlign: 'center',
										fontSize: 17,
										color: 'white',
										fontFamily: 'Lato_400Regular',
										letterSpacing: 2,
									}}>
									{item.status === 3
										? 'Accept Request'
										: item.status === 2
										? 'Update Status'
										: btn}
								</Text>
							) : (
								<Text
									style={{
										textAlign: 'center',
										fontSize: 13,
										color: 'white',
										fontFamily: 'Lato_400Regular',
										letterSpacing: 2,
									}}>
									{item.status === 2 ? 'Updating...' : 'Accepting...'}
								</Text>
							)}
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default React.memo(Card);
