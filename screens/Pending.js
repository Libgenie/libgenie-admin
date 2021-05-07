import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, FlatList } from 'react-native';
import styles from './pendingstyles';
import Subcard from '../components/optionCard';
import NoData from '../assets/defaultPending';

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

const History = props => {
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
