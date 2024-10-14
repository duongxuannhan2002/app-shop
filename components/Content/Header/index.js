import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native'; // Kiểm tra import này
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Thay đổi nếu bạn sử dụng thư viện icon khác
import { CART_SCREEN, HOME_SCREEN, PRODUCT_SCREEN, USERS_INFO } from '../../contants/routers';
import { TouchableOpacity } from 'react-native';

const FormHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Phần trên cùng với thanh tìm kiếm */}
      <View style={styles.topSection}>
        <View style={styles.searchBar}>
          <TextInput placeholder="Search" style={styles.searchInput} />
        </View>
        <Icon name="person-outline" size={30} style={styles.profileIcon} onPress = {() => navigation.navigate(USERS_INFO)}/>
      </View>

      {/* Phần dưới với các icon */}
      <View style={styles.bottomSection}>
        <Icon name="home-outline" size={30} style={styles.icon} onPress={() => navigation.navigate(HOME_SCREEN)} />
        {/* Thay thế icon bằng hình ảnh */}
        <TouchableOpacity onPress={() => navigation.navigate(PRODUCT_SCREEN)}>
          <Image
            source={require('../../../assets/image/shoe-icon.png')}
            style={styles.imageIcon}
          />
        </TouchableOpacity>
        <Icon name="cart-outline" size={30} style={styles.icon} onPress={() => navigation.navigate(CART_SCREEN)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    width: "100%",
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8bcbf',
    width: '100%',
    padding: 10,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#dcdcdc',
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 40,
  },
  searchInput: {
    height: '100%',
  },
  profileIcon: {
    marginLeft: 10,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f7c98d',
    width: "100%",
    paddingVertical: 20,
  },
  icon: {
    marginHorizontal: 20,
  },
  imageIcon: {
    width: 30, // Chiều rộng của ảnh
    height: 30, // Chiều cao của ảnh
    marginHorizontal: 20,
  },
});

export default FormHeader;
