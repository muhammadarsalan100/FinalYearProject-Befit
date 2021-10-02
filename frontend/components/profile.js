import * as React from 'react';
import { StyleSheet, Button, View, Text, Image,  TouchableOpacity,
    ImageBackground,
    TextInput,
    Alert,
    Platform,
    ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
    MaterialCommunityIcons,
    FontAwesome,
    Ionicons,
    Fontisto,
  } from 'react-native-vector-icons';
import * as ImagePicker from 'expo-image-picker';
export const Profile = (props) => {

    const [getImg, setimg] = useState('https://th.bing.com/th/id/R.9e84aed5140433e6eb88fecb47436d6d?rik=CzZ%2bjbNECPYgwg&pid=ImgRaw&r=0');
    const [getdata,setdata]=useState({user:{name:"","email":undefined,"phoneNo":undefined,"cnic":undefined,"address":undefined,"gender":undefined,"dob":undefined}});
    function btoa(input) {
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      var str = String(input);
      for (
        // initialize result and counter
        var block, charCode, idx = 0, map = chars, output = '';
        // if the next str index does not exist:
        //   change the mapping table to "="
        //   check if d has no fractional digits
        str.charAt(idx | 0) || (map = '=', idx % 1);
        // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
        output += map.charAt(63 & block >> 8 - idx % 1 * 8)
      ) {
        charCode = str.charCodeAt(idx += 3 / 4);
        if (charCode > 0xFF) {
          throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
        }
        block = block << 8 | charCode;
      }
      return output;
    }
    function arrayBufferToBase64(buffer) {
      var binary = '';
      var bytes = [].slice.call(new Uint8Array(buffer));
      bytes.forEach((b) => binary += String.fromCharCode(b));
      return btoa(binary);
    };

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const {
              status,
            } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);
    


      const updatee=async()=>{
        var myHeaders = new Headers();
        var t,id;
        if(getdata.token){
        t= await getdata.token;
        id= await getdata.user._id
        }
        myHeaders.append("Authorization", "Bearer "+t);
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({"email":"abc","phoneNo":1442,"cnic":5555,"address":"landon","gender":"female"});
        
        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://192.168.100.113:3000/patient/updateProfile/"+id, requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      }

    //   Tomorrorw i will fetch data from api by user id that is place in asyncStorage

    const fetchUserData= async ()=>{
        var data=await AsyncStorage.getItem('data');
        if(data){
            console.log("name is here!")
            const d=JSON.parse(data)
            console.log(d.user.username)
            console.log(d);
            await setdata({user:{name:d.user.username}});
            console.log('data is here!');
            console.log(getdata)
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer "+d.token);
             
            var requestOptions = {
              method: 'GET',
              headers: myHeaders,
              redirect: 'follow'
            };
            
            fetch("http://192.168.100.113:3000/patient/getownData/"+d.user._id, requestOptions)
              .then(response => response.json())
              .then(result => {
                  setdata({user:result})
                  console.log({user:result})
                })
              .catch(error => console.log('error', error));
        
        
        }
        else{
            console.log("Ohh wrong bro! user data is not given ")
        }
        // console.log(JSON.parse(jsonValue))
      }


      useEffect(()=>{
       fetchUserData()
      },[])
    

  
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 2,
          base64: true,
        });
      
        //  console.log(result);
        
      
      // let base64Img = `data:image;base64,${result.base64}`;
        // Alert.alert(base64Img);
        if (!result.cancelled) {
          setimg(result.uri);
       //   console.log(result.uri)
        }
      };
  


    useEffect(() => {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
  
      fetch("http://192.168.100.113:3000/patient/Order/60bf5057874ad732e888afa1", requestOptions)
        .then(response => response.json())
        .then(result => {
       
//     console.log(result.img.data.data)
       
          var base64Flag = 'data:image/jpeg;base64,';
          var imageStr = arrayBufferToBase64(result.img.data.data);
          setimg(base64Flag + imageStr)
//          console.log(imageStr)
        })
        .catch(error => console.log('error', error));
  
  
      // fetch('http://192.168.1.187:3000/patient/Order/60bf5057874ad732e888afa1',{
      //   method:"get"
      // })
      //     .then((res) =>{
  
      //       res.json()
      //     })
      //     .then((doc) => {
      //       console.log(doc)
      //         var base64Flag = 'data:image/jpeg;base64,';
      //         var imageStr = arrayBufferToBase64(doc.img.data.data);
      //         setimg(base64Flag + imageStr)
      //     }).catch(error => {
      //          console.log('error',error);
      //         // Alert.alert(res)
      //        });
  
    }, [])
  
    const handleupload = (image) => {
      const data = new FormData()
      data.append('file', image);
      data.append('upload_preset', 'healthApp');
      data.append('cloud_name', 'imgload')
      fetch("https://api.cloudinary.com/v1_1/imgload/image/upload", {
        method: "post",
        body: data
      }).then(res => res.json).then(data => { console.log(data) })
    }
    return ( <View style={styles.container}>
        <ScrollView>
          <View
            style={{
              height: 200,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 150,
            }}>
            <ImageBackground
              source={{
                uri: getImg,
              }}
              style={{ height: 150, width: 150 }}
              imageStyle={{ borderRadius: 100 }}>
              <View style={{
                display:'flex',
                justifyContent:"center",
                alignItems:'center',
                paddingTop:50

            }}>
            <TouchableOpacity onPress={pickImage}>
                <MaterialCommunityIcons
                  name="camera"
                  size={50}
                  color="#fff"
                  style={{
                    opacity: 0.7,
                    borderWidth: 1,
                    borderColor: '#fff',
                    borderRadius: 10
                  }}
                />
            </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
          <View style={{ marginTop: 40 }}>
            <View style={styles.input}>
              <FontAwesome name="user-o" size={20} />
              <TextInput style={styles.textinput}>{getdata.user.name?getdata.user.name:''}</TextInput>
            </View>
            <View style={styles.input}>
              <MaterialCommunityIcons name="email" size={20} />
              <TextInput style={styles.textinput}>{getdata.user.email?getdata.user.email:''}</TextInput>
            </View>
            <View style={styles.input}>
              <FontAwesome name="phone" size={20} />
              <TextInput style={styles.textinput}>{getdata.user.phoneNo?getdata.user.phoneNo:''}</TextInput>
            </View>
            <View style={styles.input}>
              <Ionicons name="location" size={20} />
              <TextInput style={styles.textinput}>{getdata.user.address?getdata.user.address:''}</TextInput>
            </View>
            <View style={styles.input}>
              <Text>cnic</Text>
              <TextInput style={styles.textinput}>{getdata.user.cnic?getdata.user.cnic:''}</TextInput>
            </View>
            <View style={styles.input}>
              <Fontisto name="date" size={20} />
              <TextInput style={styles.textinput}>{getdata.user.dob?getdata.user.dob:'MM/DD/YY'}</TextInput>
            </View>
            <View style={styles.button}>
              <LinearGradient
                colors={['#4dc2f8', '#4dc2f8']}
                style={styles.sigIn}>
                <TouchableOpacity onPress={updatee}>
                  <Text >Update</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
  

//   <Image style={{ height: '70%', width: '100%' }} source={{ uri: getImg }} />
  


const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: 8,
    },
    input: {
      height: 50,
      width: '80%',
      marginTop: 20,
      borderBottomWidth: 1,
      borderBottomColor: 'grey',
      flex: 1,
      flexDirection: 'row',
      paddingLeft: 10,
    },
    button: {
      alignItems: 'center',
      marginTop: 50,
    },
      sigIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginBottom:100
    },
    textinput:{
      height: '100%',
      width: '100%',
      marginLeft:50
    }
  });
  