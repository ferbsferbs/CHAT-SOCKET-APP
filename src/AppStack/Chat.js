import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import * as Device from "expo-device";
import { Avatar, Divider, List, Surface, Appbar } from "react-native-paper";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { TextInput, Searchbar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { Button } from "react-native-paper";
import { register } from "../utils/auth";
import { FlatList } from "react-native-gesture-handler";

import io from "socket.io-client/dist/socket.io";
var myId =
  Device.deviceName == null
    ? "NULL_"
    : Device.deviceName.replace(/[^\w\s]/gi, "_");
myId = myId + "Web";
var socket;
const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";


export function Chat({ route,navigation }) {
  const [messages, setMessages] = useState([]);
  const { user } = route.params;//To
  const { me } = route.params;//From

  useEffect(() => {
    if(!socket||socket.disconnected){
    socket = io.connect("http://maraton-leer.sytes.net:3003/user");
    }
    socket.on('connect', function (data) {
      socket.emit('storeUserIdSocket', { customId:me });
  });

    socket.on("message", (data) => {
      if (data.user._id != myId)
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, data)
        );
    });

    socket.on("getAll", (data) => {
      console.warn(data);
    });
    return ()=>{
      socket.close()
    }
  }, []);


  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    socket.emit("message", messages);
  }, []);

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
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => {navigation.goBack()}} />
        <Appbar.Content title={user.name} />
      </Appbar.Header>

      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: myId,
        }}
      />
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  surface: {
    padding: 8,

    height: 60,
    width: "100%",

    alignItems: "center",
    justifyContent: "center",
    elevation: 16,
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
    borderRadius: 100,

    height: 100,
    width: 80,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontFamily: "main2",
    fontSize: 60,
  },
});
