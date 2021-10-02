import * as React from 'react';
import { Button, View, Text, ActivityIndicator,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Signup } from './signUp';
import {SignIn} from './signIn';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer= createDrawerNavigator()
import {MyDrawer} from './drawer.js'
const Stack = createStackNavigator();
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState,useEffect } from 'react';
import {DoctorReg} from './components/doctorReg'
// const [isloading,setloading]=useState(false)
export const LoadingScreen = (props) => {

  
  const detectLogin= async ()=>{

    const token = await AsyncStorage.getItem("Token")
  
  // console.log(JSON.parse(jsonValue))
       if(token){
        props.navigation.replace("MyDrawer")
        }else{
     
          props.navigation.replace("SignIn")
         //   props.navigation.replace("MyDrawer")
        }
  }
  useEffect(()=>{
   detectLogin()
  },[])

  return (
   <View style={styles.loading}> 
    <ActivityIndicator size="large" color="blue" />
   </View>
  );
};


const styles= StyleSheet.create({
    loading:{
     flex:1,
    justifyContent:"center",
    alignItems:"center" 
    }
    
  })









function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="LoadingScreen">
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="SignIn"   component={SignIn} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen 
        name='DoctorReg'
        component={DoctorReg}
        />
        <Stack.Screen
        name="MyDrawer"
        component={MyDrawer}
        // Hiding header for Navigation Drawer
        options={{headerShown: false}}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;
