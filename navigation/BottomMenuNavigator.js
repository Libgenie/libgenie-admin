import React from 'react';
import {MaterialIcons} from '@expo/vector-icons';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import Pending from '../screens/Pending';
import Ready from '../screens/Ready';
import Issued from '../screens/Issued';

const BottomMenuNavigator = createMaterialBottomTabNavigator(
	{
		Pending: {
			screen: Pending,
			navigationOptions: {
				tabBarLabel: 'Pending',
				tabBarIcon: ({tintColor}) => {
					return <MaterialIcons name='dashboard' size={22} color={tintColor} />;
				},
			},
		},
		Ready: {
			screen: Ready,
			navigationOptions: {
				tabBarLabel: 'Ready',
				tabBarIcon: ({tintColor}) => {
					return <MaterialIcons name='search' size={22} color={tintColor} />;
				},
			},
		},
		Issued: {
			screen: Issued,
			navigationOptions: {
				tabBarLabel: 'Issued',
				tabBarIcon: ({tintColor}) => {
					return <MaterialIcons name='history' size={22} color={tintColor} />;
				},
			},
		},
	},
	{
		initialRouteName: 'Pending',
		activeColor: '#33af85',
		inactiveColor: '#969799',
		barStyle: {backgroundColor: '#ffffff'},
	}
);

export default BottomMenuNavigator;
