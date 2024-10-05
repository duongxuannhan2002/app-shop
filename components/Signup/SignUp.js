import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

import styles from './SignUpStyles';

const backgroundImage = require('../../assets/image/signup.jpg');

const SignupPage = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = () => {
        // Logic xử lý đăng ký (gửi dữ liệu lên server)
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password);
        // Thực hiện điều hướng hoặc thông báo đăng ký thành công
        navigation.navigate('SIGNIN_PATH')
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Đăng ký tài khoản</Text>

                <TextInput
                    style={styles.input}
                    placeholder="UserName"
                    value={name}
                    onChangeText={setName}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
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
                    <Text style={styles.signupButtonText}>Sign Up</Text>
                </TouchableOpacity>

            </View>
        </ImageBackground>
    );
};

export default SignupPage;
