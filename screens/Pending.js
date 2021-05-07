import React, { useEffect, useState } from 'react';
import { Text, View, Alert, ActivityIndicator, ImageBackground, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getRequests } from '../store/actions/request';
import styles from './pendingstyles';
import Subcard from '../components/optionCard';
import NoData from '../assets/defaultPending';

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

  const data = [
    {
      key: 1,
      bookname: 'THIS IS MY BOOK NAME WHICH IS MY FAVOURITE',
      author: 'Ishika Mukherjee',
      edition: 15,
      stuid: 31001219052,
    },
    {
      key: 2,
      bookname: 'THIS IS MY BOOK NAME',
      author: 'Ishika Mukherjee',
      edition: 15,
      stuid: 31001219052,
    },
    {
      key: 3,
      bookname: 'THIS IS MY BOOK NAME',
      author: 'Ishika Mukherjee',
      edition: 15,
      stuid: 31001219052,
    },
    {
      key: 4,
      bookname: 'THIS IS MY BOOK NAME',
      author: 'Ishika Mukherjee',
      edition: 15,
      stuid: 31001219052,
    },
  ];

  return (
    <ImageBackground source={require('../assets/history-bg.png')} style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Pending</Text>
      </View>

      <View style={styles.cardContainer}>
        {/* Book Details */}
        {data.length > 0 ? (
          <FlatList
            data={data}
            keyExtractor={repo => repo.key}
            renderItem={({ item }) => <Subcard item={item} />}
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

export default History;
