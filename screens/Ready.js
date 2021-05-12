import React, { useEffect, useState } from 'react';
import { Text, View, Alert, ActivityIndicator, ImageBackground, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './pendingstyles';
import Card from '../components/Card';
import NoData from '../assets/defaultPending';

const Ready = () => {
  const ready = useSelector(state => state.requests.ready);

  return (
    <ImageBackground source={require('../assets/ready-bg.png')} style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Ready</Text>
      </View>

      <View style={styles.cardContainer}>
        {/* Book Details */}
        {ready.length > 0 ? (
          <FlatList
            data={ready}
            keyExtractor={readyItem => readyItem.request_id}
            renderItem={({ item }) => <Card item={item} />}
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
