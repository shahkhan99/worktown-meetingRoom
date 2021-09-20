import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  BackHandler,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';

import RoomOne from '../components/roomOne';
import RoomTwo from '../components/roomTwo';

export default class HomeMeetings extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.roomOne}>
          <RoomOne />
        </View>
        <View style={styles.roomTwo}>
          <RoomTwo />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: Dimensions.get('window').width,
    flexDirection: 'row',
  },
  roomOne: {
    width: '50%',
    height: '100%',
  },
  roomTwo: {
    width: '50%',
    height: '100%',
  },
});
