import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Screen
import Chat from '../screen/chat';
import Foto from '../screen/foto';
import Register from '../screen/register';
import DataDiri from '../screen/dataDiri';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Register">
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Foto" component={Foto} />
        <Stack.Screen name="DataDiri" component={DataDiri} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
