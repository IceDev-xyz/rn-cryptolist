import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import {LogBox} from "react-native";

/* REDUX */
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './redux/reducers'

/* REACT CONTEXT & HOOKS */
import { AppContext } from "./hooks/Context";
import AppActions from "./hooks/AppActions"

/* NAVIGATION */
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Dashboard from "./screens/Dashboard";
import AddCrypto from "./screens/AddCrypto";

const Stack = createStackNavigator();
const Store = createStore(allReducers);

const App = () => {
  const [context, setContext] = useState({
    currencies: [],
    fetch: true,
    timestamp: null
  });

  return (
    <Provider store={Store}>
      <SafeAreaProvider>
        <AppContext.Provider value={{ context, setContext }}>
          <AppActions />
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" headerMode="none">
              <Stack.Screen name="Dashboard" component={Dashboard} />
              <Stack.Screen name="AddCrypto" component={AddCrypto} />
            </Stack.Navigator>
          </NavigationContainer>
        </AppContext.Provider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

LogBox.ignoreLogs([
  "Remote debugger",
  "Warning:",
  "VirtualizedLists should never be nested",
  "Require cycle:",
]);