import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, ImageBackground } from 'react-native';
import styles from './LoginStyles'; // Nhập styles từ file CSS

const backgroundImage = require('../../assets/image/abc.png'); // Đường dẫn đến ảnh
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Bạn có thể thực hiện xác thực tại đây
    if (username === 'admin' && password === '1234') {
      Alert.alert('Đăng nhập thành công!');
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
        placeholder="Tên người dùng"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Đăng Nhập" onPress={handleLogin} />
    </View>
    </ImageBackground>
    
  );
};

export default LoginForm;
