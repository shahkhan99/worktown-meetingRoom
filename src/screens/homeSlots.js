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
import Moment from 'moment';

import RoomOne from '../components/roomOne';
import RoomTwo from '../components/roomTwo';

export default class HomeMeetings extends Component {
  state = {
    curDate: new Date().toLocaleString(),
  };
  componentDidMount() {
    setInterval(() => {
      this.setState({
        curDate: new Date().toLocaleString(),
      });
    }, 1000);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.clock}>
          <Text style={{fontWeight: '700'}}>
            {Moment(this.state.curDate).format('MMM DD, YYYY hh:mm:ss a')}
          </Text>
        </View>
        <View style={styles.belowTime}>
          <View style={styles.roomOne}>
            <RoomOne />
          </View>
          <View style={styles.roomTwo}>
            <RoomTwo />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  roomOne: {
    width: '30%',
    height: '100%',
  },
  roomTwo: {
    width: '30%',
    height: '100%',
  },
  belowTime: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
  },
  clock: {
    width: '100%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
