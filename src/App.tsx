import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";

/* REDUX */
/* Friends don't let friends use Redux */
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './redux/reducers'

/* REACT CONTEXT & HOOKS */
import { AppContext, FetchContext } from "./hooks/Context";
import AppActions from "./hooks/AppActions"

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Dashboard from "./screens/Dashboard";
import AddCrypto from "./screens/AddCrypto";

const Stack = createStackNavigator();
let Store = createStore(allReducers);

const App = () => {
  const [context, setContext] = useState([]);
  const [fetch, setFetch] = useState(true);

  useEffect(() => {
    // Just in case...
  }, []);

  return (
    <Provider store={Store}>
      <SafeAreaProvider>
        <AppContext.Provider value={{ context, setContext }}>
        <FetchContext.Provider value={{ fetch, setFetch }}>
          <AppActions />
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" headerMode="none">
              <Stack.Screen name="Dashboard" component={Dashboard} />
              <Stack.Screen name="AddCrypto" component={AddCrypto} />
            </Stack.Navigator>
          </NavigationContainer>
        </FetchContext.Provider>
        </AppContext.Provider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;