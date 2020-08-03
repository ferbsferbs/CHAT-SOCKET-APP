import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import * as Device from "expo-device";

import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { Button } from 'react-native-paper';
import { register } from "../utils/auth";
var myId =
  Device.deviceName == null
    ? "NULL_"
    : Device.deviceName.replace(/[^\w\s]/gi, "_");
myId = myId + "Web";


export function Register({navigation}) {
  const [userName, setUserName] = useState("");
  const [userNameUser, setUserNameUser] = useState("");

  const [pass, setPass] = useState("");
  const [passC, setPassC] = useState("");

  let [fontsLoaded] = useFonts({
    main: require("../../assets/font.otf"),
    main2: require("../../assets/font2.ttf"),
  });

  const verifyRegister=async()=>{
      if(!pass||!passC||!userName||!userNameUser) return alert("Completá todos los datos")
      if(pass!=passC)return alert("Las contraseñas no son iguales")
      if(userNameUser.length<4)return alert("Minimo 4 caracteres para la usuario")
      if(pass.length<6)return alert("Minimo 6 caracteres para la contraseña")
      register(userName,pass,userNameUser).then(res=>{if(res){navigation.reset({
        routes: [{ name: "AppStack" }]
      })}})

  }
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
      <Text style={{ fontFamily: "main", fontSize: 35, marginBottom: 10 }}>
        registrar
      </Text>
    
      <View style={{ width: "100%", marginBottom: 40 }}>
        <TextInput
          style={{ margin: 20, backgroundColor: "#8FDF70" }}
          mode={"outlined"}
          label="Mail"
          value={userName}
          placeholderTextColor="#8FDF70"
          selectionColor="#8FDF70"
          onChangeText={(text) => setUserName(text)}
        />
          <TextInput
          style={{ margin: 20, backgroundColor: "#8FDF70" }}
          mode={"outlined"}
          label="Nombre de usuario"
          value={userNameUser}
          placeholderTextColor="#8FDF70"
          selectionColor="#8FDF70"
          onChangeText={(text) => setUserNameUser(text)}
        />
        <TextInput
          style={{ margin: 20, backgroundColor: "#8FDF70" }}
          mode={"outlined"}
          secureTextEntry
          label="Contraseña"
          value={pass}
          placeholderTextColor="#8FDF70"
          selectionColor="#8FDF70"
          onChangeText={(text) => setPass(text)}
        />
         <TextInput
          style={{ margin: 20, backgroundColor: "#8FDF70" }}
          mode={"outlined"}
          secureTextEntry
          label="Confirmar Contraseña"
          value={passC}
          placeholderTextColor="#8FDF70"
          selectionColor="#8FDF70"
          onChangeText={(text) => setPassC(text)}
        />
         <Button  style={{ marginHorizontal: 20, backgroundColor: "#26BA98" }} mode="contained" onPress={() => verifyRegister()}>
    Crear Cuenta
  </Button>
      </View>
      {/* <TouchableOpacity onPress={()=>navigation.navigate('AppStack', { screen: 'Home' })}> */}
      <TouchableOpacity onPress={()=>navigation.navigate('Login')}>

      <Text
      
        style={{
          fontFamily: "main2",
          fontSize: 20,
          color: "rgba(239,240,241,0.9)",
          marginBottom: 0,
        }}
      >
        Ya tenes cuenta ?
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
