import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import * as Device from "expo-device";

import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { login } from "../utils/auth";
var myId =
  Device.deviceName == null
    ? "NULL_"
    : Device.deviceName.replace(/[^\w\s]/gi, "_");
myId = myId + "Web";

export function Example({ navigation }) {
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");
  let [fontsLoaded] = useFonts({
    main: require("../../assets/font.otf"),
    main2: require("../../assets/font2.ttf"),
  });

  const verifyLogin = () => {
    if (!pass || !userName) return alert("Completá todos los datos");

    if (userName.length < 4 || pass.length < 6)
      return alert("Verificá los datos");

    login(userName, pass).then((res) => {
      console.warn(res)
      if (res) {
        navigation.reset({
          routes: [{ name: "AppStack" }],
        });
      }
    });
  };
  if (!fontsLoaded) return null;
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["#8FDF70", "#26BA98"]}
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <Text style={{ fontFamily: "main", fontSize: 60, marginBottom: 10 }}>
        log in
      </Text>

      <View style={{ width: "100%", marginBottom: 40 }}>
        <TextInput
          style={{ margin: 30, backgroundColor: "#8FDF70" }}
          mode={"outlined"}
          label="Nombre de usuario"
          value={userName}
          placeholderTextColor="#8FDF70"
          selectionColor="#8FDF70"
          onChangeText={(text) => setUserName(text)}
        />
        <TextInput
          style={{ margin: 30, backgroundColor: "#8FDF70" }}
          mode={"outlined"}
          secureTextEntry
          label="Contraseña"
          value={pass}
          placeholderTextColor="#8FDF70"
          selectionColor="#8FDF70"
          onChangeText={(text) => setPass(text)}
        />
        <Button
          style={{ margin: 30, backgroundColor: "#26BA98" }}
          mode="contained"
          onPress={() => verifyLogin()}
        >
          Login
        </Button>
      </View>

      {/* <TouchableOpacity onPress={()=>navigation.navigate('AppStack', { screen: 'Home' })}> */}
      <TouchableOpacity onPress={() => navigation.replace("Register")}>
        <Text
          style={{
            fontFamily: "main2",
            fontSize: 20,
            color: "rgba(239,240,241,0.9)",
            marginBottom: 40,
          }}
        >
          Registrarme
        </Text>
      </TouchableOpacity>
      {/* <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: myId,
      }}
    /> */}
    </LinearGradient>
  );
}
