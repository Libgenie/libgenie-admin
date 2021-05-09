import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../screens/pendingstyles';
// import Returned from '../assets/Returned';

const ReadyCard = ({ item }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    console.log('Clicked!');
  };
  return (
    <View style={styles.subCardContainer}>
      <View style={{ width: '100%' }}>
        <Text style={styles.bookName} numberOfLines={1}>
          {item.bookname.charAt(0).toUpperCase() + item.bookname.substring(1)}
        </Text>

        <View style={styles.dateContainer}>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              marginHorizontal: 5,
              backgroundColor: '#33af85',
              opacity: 0.6,
            }}></View>
          <Text style={styles.date}>{`Author : ${item.author}`}</Text>
        </View>
        <View style={styles.dateContainer}>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              marginHorizontal: 5,
              backgroundColor: 'magenta',
              opacity: 0.6,
            }}></View>
          <Text style={styles.date}>{`Edition : ${item.edition}`}</Text>
        </View>
        <View style={styles.dateContainer}>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              marginHorizontal: 5,
              backgroundColor: 'orange',
              opacity: 0.6,
            }}></View>
          <Text style={styles.date}>{`Requested by: ${item.stuid}`}</Text>
        </View>
        <View style={{ width: '100%', borderWidth: 1, marginVertical: 20, opacity: 0.2 }}></View>
        <View>
          <TouchableOpacity onPress={handleClick} disabled={isLoading} activeOpacity={0.6}>
            <View
              style={{
                marginBottom: 10,
                backgroundColor: '#00B7FF',
                borderRadius: 12,
                padding: 12,
                elevation: 6,
              }}>
              {!isLoading ? (
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 17,
                    color: 'white',
                    fontFamily: 'Lato_400Regular',
                    letterSpacing: 2,
                  }}>
                  Accept Request
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
                  Loading...
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ReadyCard;
