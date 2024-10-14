
import { HOME_SCREEN, PRODUCT_SCREEN, CART_SCREEN, USERS_INFO, ORDER_HISTORY, ORDER_DETAILS } from "../contants/routers"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from "react-native";
import FormHeader from "./Header";
import CartScreen from "./CartScreen";
import ProductScreen from "./ProductScreen";
import HomeScreen from "./HomeScreen/HomeScreen";
import UserInfoScreen from "./users_info/user_info";
import OrderHistoryScreen from "./users_info/OrderHistoryScreen/OrderHistoryScreen";
import OrderDetailScreen from "./users_info/OrderHistoryScreen/OrderDetailScreen/OrderDetailScreen";


const Stack = createNativeStackNavigator();

export default function Content() {
    return (
        <>

            <View style={{ flex: 1 }}>
                <FormHeader />
                {/* <Text>COn cac</Text> */}
                <Stack.Navigator screenOptions={{
                    headerShown: false, // Ẩn tiêu đề
                }} initialRouteName={HOME_SCREEN}>
                    <Stack.Screen name={HOME_SCREEN} component={HomeScreen} />
                    <Stack.Screen name={CART_SCREEN} component={CartScreen} />
                    <Stack.Screen name={PRODUCT_SCREEN} component={ProductScreen} />
                    <Stack.Screen name={USERS_INFO} component={UserInfoScreen} />
                    <Stack.Screen name={ORDER_HISTORY} component={OrderHistoryScreen} />
                    <Stack.Screen name={ORDER_DETAILS} component={OrderDetailScreen} />
                </Stack.Navigator>
            </View>

        </>
    )
}
