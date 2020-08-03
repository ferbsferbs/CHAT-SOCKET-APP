import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import * as Device from "expo-device";
import { Avatar, Divider, List, Surface, Appbar } from 'react-native-paper';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput, Searchbar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { Button } from "react-native-paper";
import { register, getDataIsSucess } from "../utils/auth";
import { FlatList } from "react-native-gesture-handler";
import { Notifications } from "expo";
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
var myId =
  Device.deviceName == null
    ? "NULL_"
    : Device.deviceName.replace(/[^\w\s]/gi, "_");
myId = myId + "Web";

export function Home({ navigation }) {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [token, setToken] = useState("");



useEffect(()=>{
    getDataIsSucess("credentials").then(res=>{
        console.warn(res)
        if(res.mail){
            setId(res.userId)
        setName(res.mail.substring(0, res.mail.lastIndexOf("@")))
      }})
      registerForPushNotificationsAsync()
},[])
  let [fontsLoaded] = useFonts({
    main: require("../../assets/font.otf"),
    main2: require("../../assets/font2.ttf"),
  });
  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      setToken(token)
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
    };
  
  if (!fontsLoaded) return null;
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["#8FDF70", "#26BA98"]}
      style={{
        

        flex: 1,
      }}
    >
     <Appbar.Header style={styles.header}>
     <Appbar.Action icon="menu" onPress={() => {navigation.toggleDrawer()}} />
     <Appbar.Content subtitle={"Conectado como: "+name} title="Hola!" />  
      </Appbar.Header>
      <FlatList
      style={{marginTop:30}}
        data={[
          { name: "Fer", id: "uyhfa3-223-fvfs-2egf" },
          { name: "Fer", id: "uyhfa3-223-fvfs-2aegf" },
          { name: "fer", id: "uyhfa3-223-fvfs-2fegaf" },
          { name: "fer", id: "uyhfa3-223-fvfs-geagf" },
        ]}
        renderItem={(item)=>{
            
            
            return(
                <View style={{marginHorizontal:10}}>
                    <TouchableOpacity onPress={()=>navigation.navigate("Chat",{user:item.item,me:id})}>
                <List.Item
                
                title={item.item.name}
                description="Item description"
                 left={props=><Avatar.Text  size={84} label={item.item.name.substring(0, 1).toUpperCase()+item.item.name.substring(1,2).toLocaleLowerCase()} />}
                >
                
                </List.Item>
                </TouchableOpacity>
                    <Divider></Divider>
                    </View>
             
            )
        }}
      ></FlatList>
         
      <LinearGradient
      // Background  Gradient
      colors={["#26BA90", "#8FDF70"]}
      style={styles.surface}
    >

     <TouchableOpacity    style={styles.op}onPress={()=>navigation.navigate("Search")}>

     <Text style={styles.text}>+</Text>
     </TouchableOpacity>
     </LinearGradient>

    </LinearGradient>
  );
}
const styles = StyleSheet.create({
    surface: {
      padding: 8,
      borderRadius:100,
      
      bottom:20,
      right:20,
      height: 80,
      width: 80,
      position:"absolute",
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 6,
    },
    header: {
        padding: 8,
        backgroundColor:"#26BA98",
        height: 60,
        width: "100%",
    
        alignItems: "center",
        justifyContent: "center",
        elevation: 16,
      },
    op: {
        padding: 0,
        borderRadius:100,
        
        height: 100,
        width: 80,
        position:"absolute",
        alignItems: 'center',
        justifyContent: 'center',
        
      },
    text:{
        color:"white",
        fontFamily:"main2",
        fontSize:60
    }
  });

  