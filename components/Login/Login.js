import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Nhập AsyncStorage
import axios from 'axios'; // Nhập Axios
import styles from './LoginStyles'; // Nhập styles từ file CSS

const backgroundImage = require('../../assets/image/abc.png'); // Đường dẫn đến ảnh

const LoginForm = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pass, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true); // Trạng thái ẩn hiện mật khẩu

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://ttcs-delta.vercel.app/api/v1/post-to-login', {
        phoneNumber,
        pass,
      });

      const data = response.data; // Lấy dữ liệu từ phản hồi

      // Kiểm tra xem token có tồn tại không trước khi lưu
      if (data.token) {
        await AsyncStorage.setItem('token', data.token); // Lưu token
        await AsyncStorage.setItem('userId', String(data.data.id)); // Lưu id người dùng
        await AsyncStorage.setItem('phoneNumber', data.data.phone_number); // Lưu số điện thoại
        await AsyncStorage.setItem('name', data.data.name); // Lưu tên người dùng
        Alert.alert('Đăng nhập thành công!');
        navigation.navigate('CONTENT');
      } else {
        Alert.alert('Bạn đã nhập sai tài khoản hoặc mật khẩu. Vui lòng kiểm tra lại!');
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        // Xử lý lỗi khi có phản hồi từ server
        Alert.alert(error.response.data.message || 'Có lỗi xảy ra, vui lòng thử lại!');
      } else {
        // Xử lý lỗi khi không có phản hồi từ server
        Alert.alert('Có lỗi xảy ra, vui lòng kiểm tra kết nối internet!');
      }
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Đăng Nhập</Text>
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Mật khẩu"
            secureTextEntry={secureTextEntry} // Sử dụng trạng thái secureTextEntry
            value={pass}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setSecureTextEntry(!secureTextEntry)} // Chuyển đổi trạng thái
            style={styles.eyeButton}
          >
            <Text style={styles.eyeText}>{secureTextEntry ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
        </View>
        <Button title="Đăng Nhập" onPress={handleLogin} />
        <Text style={styles.textSignUp} onPress={() => navigation.navigate('SIGNUP_PATH')}>
          Bạn chưa có tài khoản ?
        </Text>
      </View>
    </ImageBackground>
  );
};


export default LoginForm;
