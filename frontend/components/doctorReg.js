import * as React from 'react';
import { StyleSheet, Button, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { getActionFromState, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import Feather from "react-native-vector-icons/Feather";


export const DoctorReg = (props) => {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.ScrollView} >
                <Text style={{ textAlign: 'center', fontSize: 40 }}>Join as a Doctor </Text>
                <View style={styles.box}>
                    <Text style={styles.text}>Name</Text>
                    <TextInput style={styles.text_input} placeholder='Name'></TextInput>
                </View>
                <View style={styles.box}>
                    <Text style={styles.text}>Email</Text>
                    <TextInput style={styles.text_input} placeholder='Email'></TextInput>
                </View>
                <View style={styles.box}>
                    <Text style={styles.text}>Phone no</Text>
                    <TextInput style={styles.text_input} placeholder='phone no'></TextInput>
                </View>
                <View style={styles.box}>
                    <Text style={styles.text}>Cnic</Text>
                    <TextInput style={styles.text_input} placeholder='Cnic'></TextInput>
                </View>
                <View style={styles.box}>
                    <Text style={styles.text}>pmdc</Text>
                    <TextInput style={styles.text_input} placeholder='pmdc'></TextInput>
                </View>
                <View style={styles.box}>
                    <Text style={styles.text}>Address</Text>
                    <TextInput style={styles.text_input} placeholder='address'></TextInput>
                </View>

                <View style={styles.box}>
                    <Text style={styles.text}>Gender</Text>
                    <TextInput style={styles.text_input} placeholder='Gender'></TextInput>
                </View>
                <View style={styles.box}>
                    <Text style={styles.text}>City</Text>
                    <TextInput style={styles.text_input} placeholder='City'></TextInput>
                </View>
                <View style={styles.box}>
                    <Text style={styles.text}>Experience in Year</Text>
                    <TextInput style={styles.text_input} placeholder='Experience'></TextInput>
                </View>
                <View style={styles.box}>
                    <Text style={styles.text} >Tell about your self!</Text>
                    <TextInput style={styles.text_input, { height: 100, width: 250, borderWidth: 1, padding: 2 }} placeholder='Experience'></TextInput>
                </View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Signup')}
                    style={[styles.submit, { borderColor: '#4dc2f8', borderWidth: 1, marginTop: 15, marginBottom: 400 }]}
                >
                    <Text style={[styles.text_submit], { color: '#4dc2f8' }}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
            <View style={{ flex: 2 }}>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: "center",
        marginTop: 50,
        marginBottom: 50
    },
    text: {
        color: 'blue',
        fontSize: 20
    },
    text_input: {
        marginLeft: 50,
        color: '#05375a',
        borderColor: 'black',
        borderWidth: 2,
        width: 200,
        padding: 5,
        borderRadius: 10
    },
    box: {
        paddingLeft: 30,
        marginTop: 10
    },
    submit: {
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        alignSelf: 'center'
    },
    text_submit: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    ScrollView: {
        backgroundColor: "white",
        paddingTop: 3,
        width: '100%',
        marginTop: 20
    }
})


