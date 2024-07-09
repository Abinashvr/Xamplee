import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuditScreen from './screen/Home/Options/Audit/AuditScreen';  // Adjust the path accordingly

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Audit">
        <Stack.Screen name="Audit" component={AuditScreen} options={{ headerShown: false }} />
        {/* Add other screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
