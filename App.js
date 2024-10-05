import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Content from './components/Content/Router';
import LoginForm from './components/Login/Login';
import SignupPage from './components/Signup/SignUp';
import Router from './components/router/Router';

export default function App() {
  return (
    <Router></Router>
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
