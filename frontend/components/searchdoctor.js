import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Divider,
  Searchbar,
} from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, ScrollView, Image, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DoctorProfile } from './doctorprofile';
export const SearchDoctor = ({ navigation }) => {
  const a = 'Ahmad';
  const onChangeSearch = (query) => setSearchQuery(query);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [getlist, setlist] = useState([]);
  const [isloading, setloading] = useState(true);
  const [gettoken, settoken] = React.useState();





  async function retrieveSessionToken() {
    try {
      const token = await AsyncStorage.getItem('Token');
      if (token !== null) {
        // console.log(token);
        settoken(token)
        console.log((token))
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
          method: 'GET',
          headers: myHeaders
        };

        fetch("http://192.168.100.113:3000/patient/doctors", requestOptions)
          .then(response => response.json())
          .then(result => {
            setlist(result)
            setloading(false)
          })
          .catch(error => console.log('error', error));
        return token
      }
    } catch (error) {
      console.log("Error while reterving the token");
    }
  }

  useEffect(() => {
    const t = retrieveSessionToken()
    // return fetch("http://192.168.100.109:3000/patient/doctors", {
    //   "method": "GET",
    //   'Authorization': `Bearer {t}`
    // })
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     setlist(responseJson)
    //     console.log(responseJson)
    //     setloading(false)
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });

  }, [])
  const LeftContent = (props) => (
    <Image
      source={{
        uri:
          'https://th.bing.com/th/id/R.8e929df204d4c3d52d6c860dcb0d14d7?rik=fdTciZ%2fmtCL8ZQ&pid=ImgRaw&r=0',
      }}
      style={{
        height: 40,
        width: 40,
        borderRadius: 30 / 2,
      }}
    />
  );
  const RightContent = (props) => (
    <MaterialIcons name="arrow-forward" size={30} color="blue" />
  );


  return (
    isloading ? (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Loading Data ...</Text>
      </View>
    )
      :
      <View>
        <View style={{ marginTop: 20 }}>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </View>
        <FlatList data={getlist} keyExtractor={item => Math.random().toString()} renderItem={({ item }) =>
        (<TouchableOpacity key={Math.random().toString()} onPress={()=>navigation.navigate('DoctorProfile',{item:item})}>
          <Card>
            <Card.Title
              title={item.name}
              subtitle={"Experience :" + item.experience + "         " + item.city}
              left={LeftContent}
              right={RightContent}
            />
          </Card>
        </TouchableOpacity>
        )
        }
        />

        <Divider />
      </View>
  );
};
