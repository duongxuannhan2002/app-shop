import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, ImageBackground } from 'react-native';
import { HOME_SCREEN } from '../contants/routers';
import styles from './LoginStyles'; // Nhập styles từ file CSS

const backgroundImage = require('../../assets/image/abc.png'); // Đường dẫn đến ảnh
const LoginForm = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Bạn có thể thực hiện xác thực tại đây
    if (username === 'admin' && password === '1234') {
      Alert.alert('Đăng nhập thành công!');
      navigation.navigate('CONTENT')
    } else {
      Alert.alert('Tên người dùng hoặc mật khẩu không đúng!');
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Đăng Nhập</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Đăng Nhập" onPress={handleLogin} />
        <Text style={styles.textSignUp} onPress={() => navigation.navigate('SIGNUP_PATH')}>
          Bạn chưa có tài khoản ?
          </Text>

      </View>
    </ImageBackground>

  );
};

export default LoginForm;
