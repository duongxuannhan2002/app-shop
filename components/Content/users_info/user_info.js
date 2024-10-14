import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Nhập AsyncStorage
// import styles from './UserInfoStyles'; // Nhập styles (tự tạo)
import { StyleSheet } from 'react-native';
import { ORDER_HISTORY } from '../../contants/routers';

const UserInfoScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({
    userId: '',
    phoneNumber: '',
    name: ''
  });

  // Hàm lấy thông tin người dùng từ AsyncStorage
  const getUserInfo = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const phoneNumber = await AsyncStorage.getItem('phoneNumber');
      const name = await AsyncStorage.getItem('name');

      if (userId && phoneNumber && name) {
        setUserInfo({
          userId,
          phoneNumber,
          name
        });
      } else {
        Alert.alert('Không tìm thấy thông tin người dùng.');
      }
    } catch (error) {
      console.error('Lỗi khi lấy thông tin người dùng:', error);
    }
  };

  // Tự động gọi hàm getUserInfo khi trang được mở
  useEffect(() => {
    getUserInfo();
  }, []);

  // Hàm đăng xuất, xóa thông tin đã lưu
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // Xóa tất cả dữ liệu trong AsyncStorage
      Alert.alert('Đăng xuất thành công!');
      // Reset lại stack điều hướng và đưa về trang đăng nhập
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'SIGNIN_PATH' }], // Thay 'Login' bằng tên màn hình đăng nhập của bạn
        })
      );
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Thông Tin Người Dùng</Text>
        <Text style={styles.infoText}>Tên: {userInfo.name}</Text>
        <Text style={styles.infoText}>Số điện thoại: {userInfo.phoneNumber}</Text>
        <Text style={styles.infoText}>User ID: {userInfo.userId}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Xem đơn hàng đã mua" onPress={() => navigation.navigate(ORDER_HISTORY)} />
        </View>
        
        <View style={styles.buttonContainer}>
          <Button title="Đăng xuất" onPress={handleLogout} color="red" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  infoContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  buttonContainer: {
    marginVertical: 10,
  },
});

export default UserInfoScreen;
