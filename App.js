import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Content from './components/Content/Router';
import LoginForm from './components/Login/Login';
import SignupPage from './components/Signup/SignUp';

export default function App() {
  return (
    <View style={styles.container}>
        <SignupPage></SignupPage>
        {/* <LoginForm></LoginForm> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
