import React, { useState } from 'react';
import { View, Button, Platform, Text, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Avatar,
  Button as NativeButton,
  Card,
  Title,
  Paragraph,
  Divider,
  Searchbar,
} from 'react-native-paper';
export default function AppointmentDate() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    console.log(currentDate);
    let tempdate = new Date(currentDate);
    let fdate =
      tempdate.getDate() +
      '/' +
      tempdate.getMonth() +
      '/' +
      tempdate.getFullYear();
    let ftime = tempdate.getHours() + ':' + tempdate.getMinutes();
    setText(fdate + '\n' + ftime);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      <View style={{ paddingTop: 50 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 30,textAlign:'center' }}>Make a booking</Text>
        <Text style={{ textAlign: 'center', fontSize: 20 }}>{text}</Text>
      </View>
      <View style={{ alignItems: 'left' }}>
        <View>
          <Button onPress={showDatepicker} title="Select date!" />
        </View>
        <View>
          <Button onPress={showTimepicker} title="Select time!" />
        </View>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <View style={{ margin: 20 }}>
        <NativeButton
          mode="contained"
          onPress={() => Alert.alert('ok proceed next step')}>
          Next step proceed 
        </NativeButton>
      </View>
    </View>
  );
}
