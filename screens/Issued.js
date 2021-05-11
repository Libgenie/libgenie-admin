import React, { useEffect, useState } from 'react';
import { Text, View, Alert, ActivityIndicator, ImageBackground, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './pendingstyles';
import Card from '../components/Card';
import NoData from '../assets/defaultIssued';

const Issued = () => {
  const issued = useSelector(state => state.requests.issued);

  if (isLoading)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size='large' color='#33af85' />
      </View>
    );

  return (
    <ImageBackground source={require('../assets/dashboard-bg.png')} style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Issued</Text>
      </View>

      <View style={styles.cardContainer}>
        {/* Book Details */}
        {issued.length > 0 ? (
          <FlatList
            data={issued}
            keyExtractor={issuedItem => issuedItem.request_id}
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
              There aren't any issued books...
            </Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default Issued;
