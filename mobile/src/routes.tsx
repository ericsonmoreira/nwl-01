import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Points from './pages/Points';
import Detail from './pages/Detail';

const AppStrack = createStackNavigator();

const Routes = () => {
  
  return (
    <NavigationContainer>
      <AppStrack.Navigator
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: '#f0f0f5'
          }
        }}>
        <AppStrack.Screen name="Home" component={Home} />
        <AppStrack.Screen name="Points" component={Points} />
        <AppStrack.Screen name="Detail" component={Detail} />

      </AppStrack.Navigator>
    </NavigationContainer>
  )
}

export default Routes;