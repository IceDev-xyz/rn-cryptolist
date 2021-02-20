import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";

//import { AppContext } from "./resources/context"; 

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Dashboard from "./screens/Dashboard";

const Stack = createStackNavigator();

const App = () => {
  const [context, setContext] = useState([]);

  useEffect(() => {
    //setContext(videoList);
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" headerMode="none">
          <Stack.Screen name="List" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;