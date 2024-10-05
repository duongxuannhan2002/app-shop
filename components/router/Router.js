// router.js
import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginForm from '../Login/Login';
import SignupPage from '../Signup/SignUp';
import Content from '../Content/Router';

const Stack = createNativeStackNavigator();

function Router() {
  return (
    
      <Stack.Navigator screenOptions={{
          headerShown: false, // Ẩn tiêu đề
        }}>
        <Stack.Screen name="SIGNIN_PATH" component={LoginForm}  />
        <Stack.Screen name="SIGNUP_PATH" component={SignupPage} />
        <Stack.Screen name="CONTENT" component={Content} />
      </Stack.Navigator>
   
  );
}

export default Router;
