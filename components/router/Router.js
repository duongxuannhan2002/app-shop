// router.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginForm from '../Login/Login';
import SignupPage from '../Signup/SignUp';

const Stack = createNativeStackNavigator();

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
          headerShown: false, // Ẩn tiêu đề
        }}>
        <Stack.Screen name="SIGNIN_PATH" component={LoginForm}  />
        <Stack.Screen name="SIGNUP_PATH" component={SignupPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
