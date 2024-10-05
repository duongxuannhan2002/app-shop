import HomeScreen from "./HomeScreen/HomeScreen"
import { HOME_SCREEN, PRODUCT_SCREEN, CART_SCREEN } from "../contants/routers"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View , Text} from "react-native";

const Stack = createNativeStackNavigator();

export default function Content() {
    return (
        <>
        <View>
            <Text>Dây là header</Text>
        </View>
        <NavigationContainer>
            <Stack.Navigator initialRouteName={HOME_SCREEN}>
                <Stack.Screen name= {HOME_SCREEN} component={HomeScreen} />
                {/* <Stack.Screen name={PRODUCT_SCREEN} component={PRODUCT_SCREEN} /> */}
            </Stack.Navigator>
        </NavigationContainer>
        </>
    )
}