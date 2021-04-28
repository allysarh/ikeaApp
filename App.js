import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
// library untuk navigasi
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import StackNavigation from './src/navigation/StackNavigation'
import { Provider, useDispatch } from "react-redux";
import ReduxThunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import Reducers from './src/reducer'
import axios from 'axios';
import { URL_API } from './src/helper';
import { notifConfig, notifCreateChannel } from "./src/helper";
import PushNotification from 'react-native-push-notification';

const App = (props) => {

  // mode component did mount 
  useEffect(() => {
    notifConfig()
    notifCreateChannel("A1", "Checkout Notif")
    PushNotification.getChannels((channelId) =>{
      console.log(channelId)
    })
  }, [])

  return (
    <SafeAreaProvider>
      <Provider store={createStore(Reducers, {}, applyMiddleware(ReduxThunk))}>
        {/* mirip native router */}
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  )
}

export default App