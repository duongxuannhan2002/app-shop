import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
  StyleSheet
} from 'react-native';

const productData = [
  { id: '1', name: 'Shoe 1', brand: 'Nike', price: 100, image: require('../../../assets/image/s1.jpeg') },
  { id: '2', name: 'Shoe 2', brand: 'Adidas', price: 150, image: require('../../../assets/image/s1.jpeg') },
  { id: '3', name: 'Shoe 3', brand: 'Puma', price: 200, image: require('../../../assets/image/s1.jpeg') },
  { id: '4', name: 'Shoe 4', brand: 'Nike', price: 250, image: require('../../../assets/image/s1.jpeg') },
  // Thêm các sản phẩm khác
];

export default function ProductScreen() {
  const [products, setProducts] = useState(productData);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const applyFilters = () => {
    const filteredProducts = productData.filter((product) => {
      const withinPriceRange =
        (!minPrice || product.price >= Number(minPrice)) &&
        (!maxPrice || product.price <= Number(maxPrice));

      const matchesBrand = selectedBrand ? product.brand === selectedBrand : true;

      return withinPriceRange && matchesBrand;
    });

    setProducts(filteredProducts);
    setSearchModalVisible(false); // Đóng modal sau khi lọc
  };

  const resetFilters = () => {
    setProducts(productData); // Khôi phục tất cả sản phẩm
    setSelectedBrand('');
    setMinPrice('');
    setMaxPrice('');
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Nút tìm kiếm nâng cao */}
      <TouchableOpacity
        style={styles.advancedSearchButton}
        onPress={() => setSearchModalVisible(true)}
      >
        <Text style={styles.advancedSearchButtonText}>Tìm kiếm nâng cao</Text>
      </TouchableOpacity>

      {/* Lưới sản phẩm */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productGrid}
      />

      {/* Modal tìm kiếm nâng cao */}
      <Modal visible={searchModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tìm kiếm nâng cao</Text>

            {/* Chọn hãng */}
            <TextInput
              placeholder="Chọn hãng (Nike, Adidas, Puma)"
              style={styles.input}
              value={selectedBrand}
              onChangeText={setSelectedBrand}
            />

            {/* Chọn tầm giá */}
            <TextInput
              placeholder="Giá thấp nhất"
              style={styles.input}
              keyboardType="numeric"
              value={minPrice}
              onChangeText={setMinPrice}
            />
            <TextInput
              placeholder="Giá cao nhất"
              style={styles.input}
              keyboardType="numeric"
              value={maxPrice}
              onChangeText={setMaxPrice}
            />

            {/* Nút áp dụng */}
            <View style={styles.buttonGroup}>
              <Button title="Tìm kiếm" onPress={applyFilters} />
              <Button title="Hủy" onPress={() => setSearchModalVisible(false)} color="red" />
              <Button title="Reset" onPress={resetFilters} color="gray" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  advancedSearchButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  advancedSearchButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  productGrid: {
    justifyContent: 'space-between',
  },
  productContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productName: {
    fontSize: 16,
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonGroup: {
    marginTop: 10,
  },
});
