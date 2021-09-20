import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
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
import CountDown from 'react-native-countdown-component';
import {getRoomOneMeetings, offRef} from '../backend/logic';
import Moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';

export default class RoomOne extends Component {
  state = {
    meetingSlot: [],
    meetingDate: [],
    currentMeeting: [],
  };
  fetchMeetings = () => {
    let date = [];
    let meetingData = [];
    getRoomOneMeetings(data => {
      this.setState({meetingSlot: []});

      Object.keys(data).forEach(d => {
        if (
          Moment(d).format('MMM DD, YYYY') ===
          Moment(new Date()).format('MMM DD, YYYY')
        ) {
          date.push(d);
          Object.keys(data[d]).forEach(keys => {
            let items = data[d][keys];
            console.log(
              new Date(
                Moment(new Date()).format('YYYY/MM/DD') + ' ' + items.endTime,
              ).getTime() > new Date().getTime(),
            );
            if (
              new Date(
                Moment(new Date()).format('YYYY/MM/DD') + ' ' + items.endTime,
              ).getTime() > new Date().getTime()
            ) {
              meetingData.push(items);
            }
          });
          meetingData.sort((a, b) => {
            return (
              new Date('1970/01/01 ' + a.startTime) -
              new Date('1970/01/01 ' + b.startTime)
            );
          });

          this.setState(
            {
              meetingSlot: meetingData,
              meetingDate: date,
            },
            () => this.setTimerArray(),
          );
        }
      });
    });
  };

  componentDidMount() {
    this.fetchMeetings();
  }

  setTimerArray = () => {
    const {meetingSlot} = this.state;
    meetingSlot.forEach(meet => {
      // console.log(new Date('1970/01/01 ' + ' ' + meet.startTime).getTime());
      // console.log(new Date('1970/01/01 ' + meet.startTime), 'ass');
    });
  };
  render() {
    let {meetingDate, meetingSlot} = this.state;
    console.log(meetingSlot[0]);
    let obj = JSON.parse(JSON.stringify(meetingSlot[0]));
    console.log(obj);
    return (
      <View style={styles.container}>
        <View style={styles.roomHead}>
          <Text>Room 1</Text>
        </View>

        <View style={styles.timerBlock}>
          <Text
            style={{
              fontSize: 20,
              color: '#fff',
              fontWeight: '600',
              marginBottom: 10,
              textDecorationLine: 'underline',
            }}>
            Current Meeting
          </Text>
          <View style={styles.innerBlock}>
            <View>
              <Text style={{fontSize: 20, color: '#fff', fontWeight: '500'}}>
                {}
              </Text>
              <Text style={{color: '#fff'}}>12:30pm to 12:45pm</Text>
            </View>
            <View>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>
                Time Remaining:
              </Text>
              <CountDown
                size={20}
                until={1000}
                onFinish={() => alert('Finished')}
                digitStyle={{
                  backgroundColor: 'transparent',
                  borderWidth: 2,
                  borderColor: '#fff',
                }}
                digitTxtStyle={{color: '#fff'}}
                timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
                separatorStyle={{color: '#fff'}}
                timeToShow={['H', 'M', 'S']}
                timeLabels={{m: null, s: null}}
                showSeparator
              />
            </View>
          </View>
        </View>
        <View
          style={{height: Dimensions.get('window').height / 2, width: '50%'}}>
          {meetingDate.length == 0 ? (
            <View
              style={{
                marginTop: 10,
                width: '100%',
                alignItems: 'center',
              }}>
              <Text>No meeting available</Text>
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{height: Dimensions.get('window').height, flex: 1}}>
              <View style={styles.user}>
                <View style={styles.completeView}>
                  <View style={styles.dateView}>
                    <View>
                      <Text style={{color: '#d0d6d1'}}>Today</Text>
                    </View>
                  </View>
                  <View>
                    {meetingSlot.map((item, i) => {
                      // const item = meetingSlot[val][key];
                      return (
                        <View style={styles.slotCard} key={i}>
                          <View>
                            <Image
                              source={{uri: item.companyImage}}
                              style={styles.dp}
                            />
                          </View>
                          <View style={styles.detailsView}>
                            <Text style={styles.companyHead}>
                              {item.userCompany}
                            </Text>
                            <View style={styles.roomTime}>
                              <View>
                                <Text>Meeting Room {item.roomNumber}</Text>
                              </View>

                              <View style={styles.timeView}>
                                <Text>{item.startTime}</Text>
                                <Text> - </Text>
                                <Text>{item.endTime}</Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </View>
            </ScrollView>
          )}
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
  timerBlock: {
    height: 120,
    width: '50%',
    backgroundColor: '#5f1569',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 20,
    marginTop: 10,
  },
  innerBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  headertext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  textview: {
    width: '90%',
  },
  backicon: {
    display: 'flex',
    width: '30%',
    // justifyContent: 'space-between',
  },
  header: {
    backgroundColor: '#6B3590',
    height: 50,
    width: Dimensions.get('window').width,
    textAlign: 'center',
    alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: Dimensions.get('window').width,
  },
  user: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 70,
  },
  dateView: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    left: 20,
  },
  dp: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  completeView: {
    width: '100%',
  },

  roomTime: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 15,
  },
  detailsView: {
    width: '70%',
  },
  slotCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: '95%',
    margin: 5,
    backgroundColor: '#FFF9FF',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderLeftWidth: 4,
    borderLeftColor: '#6B3590',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  timeView: {
    display: 'flex',
    flexDirection: 'row',
  },
  companyHead: {
    fontWeight: '700',
    fontSize: 20,
    color: '#6B3590',
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  roomHead: {
    width: '50%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8e8e8',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
