import React, {useEffect, useState} from 'react';
import {
	Text,
	View,
	Alert,
	ActivityIndicator,
	ImageBackground,
	FlatList,
} from 'react-native';
import styles from './pendingstyles';
import Card from '../components/Card';
import NoData from '../assets/defaultPending';
const data = [
	{
		key: 1,
		name: 'THIS IS MY BOOK NAME WHICH IS MY FAVOURITE',
		author: 'Ishika Mukherjee',
		edition: 15,
		stuid: 31001219052,
	},
	{
		key: 2,
		name: 'THIS IS MY BOOK NAME',
		author: 'Ishika Mukherjee',
		edition: 15,
		stuid: 31001219052,
	},
	{
		key: 3,
		name: 'THIS IS MY BOOK NAME',
		author: 'Ishika Mukherjee',
		edition: 15,
		stuid: 31001219052,
	},
	{
		key: 4,
		name: 'THIS IS MY BOOK NAME',
		author: 'Ishika Mukherjee',
		edition: 15,
		stuid: 31001219052,
	},
];

const Ready = () => {
	return (
		<ImageBackground
			source={require('../assets/ready-bg.png')}
			style={styles.screen}>
			<View style={styles.headerContainer}>
				<Text style={styles.header}>Ready</Text>
			</View>

			<View style={styles.cardContainer}>
				{/* Book Details */}
				{data.length > 0 ? (
					<FlatList
						data={data}
						keyExtractor={data => data.key}
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

export default Ready;
