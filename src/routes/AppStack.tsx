import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Landing from '../pages/Landing';
import PedirPage from '../pages/PedirPage';
import DevolverPage from '../pages/DevolverPage';

const { Navigator, Screen } = createStackNavigator();

function AppStack(){
  return (
    <NavigationContainer>
      <Navigator screenOptions={{headerShown:false}}>
        <Screen name="Landing" component={Landing}/>
        <Screen name="PedirPage" component={PedirPage}/>
        <Screen name="DevolverPage" component={DevolverPage}/>
      </Navigator>
    </NavigationContainer>
  )
}

export default AppStack;