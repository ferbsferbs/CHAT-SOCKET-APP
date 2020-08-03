import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import * as Device from "expo-device";
import { Avatar, Divider, List, Surface } from 'react-native-paper';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput, Searchbar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { IconButton } from "react-native-paper";
import { register } from "../utils/auth";
import { FlatList } from "react-native-gesture-handler";
import { SearchForUsers } from "../utils/httpRequest";
var myId =
  Device.deviceName == null
    ? "NULL_"
    : Device.deviceName.replace(/[^\w\s]/gi, "_");
myId = myId + "Web";

export function Search({ navigation }) {
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [passC, setPassC] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const onChangeSearch = (query) => {
    setSearchQuery(query)
    SearchForUsers(query).then(res=>{
      
      setSearchResult(res)})
    };

  let [fontsLoaded] = useFonts({
    main: require("../../assets/font.otf"),
    main2: require("../../assets/font2.ttf"),
  });

  if (!fontsLoaded) return null;
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["#8FDF70", "#26BA98"]}
      style={{
        

        flex: 1,
      }}
    >
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{ top: 0,margin:20,marginTop:70,elevation:12 }}
      />
      <FlatList
        data={searchResult}
        renderItem={(item)=>{
            console.warn(item)
            
            return(
                <View style={{marginHorizontal:10}}>
                <List.Item
                title={item.item.name}
                description="Item description"
                 left={props=><Avatar.Text  size={84} label={item.item.name.substring(0, 1).toUpperCase()+item.item.name.substring(1,2).toLocaleLowerCase()} />}
                >
                
                </List.Item>
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

     <TouchableOpacity    style={styles.op}onPress={()=>navigation.navigate("Home")}>

     <IconButton size={45} color={"white"} icon="arrow-left"></IconButton>
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
    text:{
        color:"white",
        fontFamily:"main2",
        fontSize:60
    }
  });