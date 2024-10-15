import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import axios from 'axios'; // Nhập Axios
import styles from './SignupStyles'
import { useNavigation } from '@react-navigation/native';

const backgroundImage = require('../../../assets/image/s1.jpeg');

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(''); // Thêm state cho phoneNumber
    const [password, setPassword] = useState('');

    const navigation = useNavigation();
    const handleSignup = async () => {
        try {
            // Gọi API để đăng ký người dùng
            const response = await axios.post('https://ttcs-delta.vercel.app/api/v1/post-user', {
                name,
                email,
                phoneNumber,
                pass: password, // Đổi tên thuộc tính password thành pass
            });

            // Kiểm tra phản hồi từ API
            if (response.status === 200) {
                Alert.alert('Đăng ký thành công!');
                // Điều hướng đến trang đăng nhập
                navigation.navigate('SIGNIN_PATH');
            } else {
                Alert.alert('Đăng ký không thành công. Vui lòng kiểm tra lại thông tin.');
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
                <Text style={styles.title}>Đăng ký tài khoản</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Tên người dùng"
                    value={name}
                    onChangeText={setName}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Số điện thoại"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />

                <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                    <Text style={styles.signupButtonText}>Đăng Ký</Text>
                </TouchableOpacity>

            </View>
        </ImageBackground>
    );
};

export default SignupPage;