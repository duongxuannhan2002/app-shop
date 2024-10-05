import { Text, View ,StyleSheet} from "react-native"


export default function HomeScreen(){
    console.log("Rendering HomeScreen");

    return(
        <View  style={styles.container}>
            <Text>
                Đây là HomeScreen
                có con cá con
                Con cac
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ddd',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%' ,
      width: '100%',
    },
  });