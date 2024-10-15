import React from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Thay đổi nếu bạn sử dụng thư viện icon khác
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Phần trên cùng với thanh tìm kiếm */}
      <View style={styles.topSection}>
        <View style={styles.searchBar}>
          <TextInput placeholder="Search" style={styles.searchInput} />
        </View>
        <Icon name="person-outline" size={30} style={styles.profileIcon} onPress = {() => navigation.navigate('userinfo')}/>
      </View>

      {/* Phần dưới với các icon */}
      <View style={styles.bottomSection}>
        {/* Icon Home */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="home-outline" size={30} style={styles.icon} />
        </TouchableOpacity>

        {/* Thay thế icon bằng hình ảnh (Profile) */}
        <TouchableOpacity onPress={() => navigation.navigate('Product')}>
          <Image
            source={require('../../../assets/image/shoe-icon.png')}
            style={styles.imageIcon}
          />
        </TouchableOpacity>

        {/* Icon Cart */}
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Icon name="cart-outline" size={30} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    width: "100%",
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8bcbf',
    padding: 10,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#dcdcdc',
    borderRadius: 20,
    paddingHorizontal: 20,
    marginRight: 20,
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
    justifyContent: 'space-around',
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

export default Header;
