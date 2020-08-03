import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Example } from "./src/authstack/example";
import { Provider as PaperProvider,Button } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Register } from "./src/authstack/register";
import { Home } from "./src/AppStack/Home";
import AsyncLogin from "./src/authstack/asyncLogin";
import {getDataIsSucess} from "./src/utils/auth"
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Search } from "./src/AppStack/Search";
import { Chat } from "./src/AppStack/Chat";

var cred 
 getDataIsSucess("credentials").then(res=>{
   cred=res.mail.substring(0, res.mail.lastIndexOf("@"))
 })
const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="AuthStack"
            component={AuthStack}
            options={{
              headerTransparent: true,
              title: "",
              animationTypeForReplace: "push",
            }}
           
          />

          <Stack.Screen
            // options={{
            //   headerTitle: ()=><Text>{cred}</Text>,
            //   headerStyle: {
            //     backgroundColor: "#8FDF70",
            //   },
            //   headerTintColor: "black",
              
            // }}
            options={{
              headerShown: false, // change this to `false`
            }}
            name="AppStack"
            component={AppStack}
          />
      <Stack.Screen   options={{
              headerShown: false, // change this to `false`
            }}name="Chat" component={Chat} />

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
export default App;

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="asyncLogin" component={AsyncLogin} />
      <Stack.Screen name="Login" component={Example} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Search" component={Search} />


    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
