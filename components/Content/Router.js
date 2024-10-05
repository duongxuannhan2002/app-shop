
import { HOME_SCREEN, PRODUCT_SCREEN, CART_SCREEN } from "../contants/routers"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from "react-native";
import FormHeader from "./Header";
import CartScreen from "./CartScreen";
import ProductScreen from "./ProductScreen";
import HomeScreen from "./HomeScreen/HomeScreen";

const Stack = createNativeStackNavigator();

export default function Content() {
    return (
        <>
            
                <View style={{ flex: 1 }}>
                    <FormHeader />
                    {/* <Text>COn cac</Text> */}
                    <Stack.Navigator initialRouteName={HOME_SCREEN}>
                        <Stack.Screen name={HOME_SCREEN} component={HomeScreen} />
                        <Stack.Screen name={CART_SCREEN} component={CartScreen} />
                        {/* ProductScreen */}
                        <Stack.Screen name={PRODUCT_SCREEN} component={ProductScreen} />


                    </Stack.Navigator>
                </View>
            
        </>
    )
}
