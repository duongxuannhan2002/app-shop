import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity, FlatList, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Thay đổi nếu bạn sử dụng thư viện icon khác
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  const [searchKeyword, setSearchKeyword] = useState(''); // Từ khóa tìm kiếm
  const [searchResults, setSearchResults] = useState([]); // Kết quả tìm kiếm

  const fetchProducts = (keyword) => {
    // Dữ liệu giả lập từ API
    fetch(`https://ttcs-delta.vercel.app/api/v1/get-shoes-by-search?key=${keyword}`) // Gọi API
      .then((response) => response.json()) // Chuyển đổi dữ liệu nhận được thành JSON
      .then((json) => {
        setSearchResults(json.data)
        // Lưu dữ liệu vào state
      })
      .catch((error) => {
        console.error(error); // Bắt lỗi nếu có
      });
  };

  // Hàm xử lý tìm kiếm khi từ khóa thay đổi
  const handleSearch = (keyword) => {
    setSearchKeyword(keyword); // Cập nhật từ khóa
    fetchProducts(keyword); // Gọi API với từ khóa
  };

  return (
    <View style={styles.container}>
      {/* Phần trên cùng với thanh tìm kiếm */}
      <View style={styles.topSection}>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            value={searchKeyword}
            onChangeText={handleSearch} // Gọi hàm tìm kiếm mỗi khi từ khóa thay đổi
          />
        </View>
        <Icon name="person-outline" size={30} style={styles.profileIcon} onPress={() => navigation.navigate('userinfo')} />
      </View>

      {/* Phần dưới với các icon */}
      <View style={styles.bottomSection}>
        {/* Icon Home */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="home-outline" size={30} style={styles.icon} />
        </TouchableOpacity>

        {/* Thay thế icon bằng hình ảnh (Product) */}
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

      {/* Hiển thị danh sách sản phẩm */}
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productItem} onPress={() => navigation.navigate('ProductDetails', { product: item.id })}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
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
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  productName: {
    fontSize: 16,
  },
});

export default Header;
