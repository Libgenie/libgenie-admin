import React, { useEffect } from 'react';
import useUpdate from '../hooks/useUpdate';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import styles from '../screens/pendingstyles';
// import Returned from '../assets/Returned';

const Card = ({ item }) => {
  const { loading, error, errorMessage, setIsClicked, setError } = useUpdate();
  let btnColor = '';
  if (item.status === 3) {
    btnColor = '#f9a826';
  } else if (item.status === 2) {
    btnColor = '#00B7FF';
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

  const handleClick = () => {
    console.log('Clicked!');
    setIsClicked({ issue_id: item.request_id, return_date: '2021-05-22T18:29:59.000Z' });
  };
  return (
    <View style={styles.subCardContainer}>
      <View style={{ width: '100%' }}>
        <Text style={styles.bookName} numberOfLines={1}>
          {item.name.charAt(0).toUpperCase() + item.name.substring(1)}
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
        <View
          style={{
            width: '100%',
            borderWidth: 1,
            marginVertical: 20,
            opacity: 0.2,
          }}></View>
        <View>
          <TouchableOpacity onPress={handleClick} disabled={loading} activeOpacity={0.6}>
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
                    : 'Accept Return'}
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
