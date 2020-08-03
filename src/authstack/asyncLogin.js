import React, { useEffect } from "react";
import { loginAsyncStorage } from "../utils/auth";
import { View } from "react-native";

function AsyncLogin({ navigation }) {
  useEffect(() => {
    console.warn("AUTO LOGIN")

   loginAsyncStorage().then((res) => {
        console.warn("Resultado Auto",res)
      if (res) {
          console.warn("AUTO LOGIN",res)
     navigation.reset({
          routes: [{ name: "AppStack" }],
        });
      } else {
         navigation.navigate("Login");
      }
    });
  }, []);
  return <View></View>;
}

export default AsyncLogin;
