import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import DetailProduct from './DetailProduct';
import OrderForm from './Buy';
import VNPayScreen from './Payment';
import MyWebView, { MyWeb, MyWebComponent } from './test';
import CartScreen from './CartScreen';
import ProductScreen from './ProductScreen';
import LoginForm from './Login/Login';
import SignupPage from './Signup';
import UserInfoScreen from './users_info/users_info';
import OrderHistoryScreen from './users_info/OrderHistoryScreen/OrderHistoryScreen';
import OrderDetailScreen from './users_info/OrderHistoryScreen/OrderDetailScreen/OrderDetailScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SIGNIN_PATH">
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ProductDetails" component={DetailProduct} options={{ headerShown: false }} />
                <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
                <Stack.Screen name="OrderForm" component={OrderForm} options={{ headerTitle: '' }} />
                <Stack.Screen name="Vnpay" component={VNPayScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Product" component={ProductScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SIGNIN_PATH" component={LoginForm} options={{ headerShown: false }}/>
                <Stack.Screen name="SIGNUP_PATH" component={SignupPage} options={{ headerShown: false }} />
                <Stack.Screen name='userinfo' component={UserInfoScreen} options={{ headerShown: false }} />
                <Stack.Screen name='OrderHistory' component={OrderHistoryScreen} options={{ headerShown: false }}/>
                <Stack.Screen name='OderDetails' component={OrderDetailScreen} options={{ headerShown: false }}/>
                {/* <Stack.Screen name="CONTENT" component={Content} /> */}
            </Stack.Navigator>
        </NavigationContainer>

        // <MyWebComponent></MyWebComponent>
    );
}
