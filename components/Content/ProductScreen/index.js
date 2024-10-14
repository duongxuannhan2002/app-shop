import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select'; // Nhập RNPickerSelect
import styles from './style';

export default function ProductScreen() {
  const [products, setProducts] = useState([]);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [noProductsFound, setNoProductsFound] = useState(false); // Thêm trạng thái

  const handleGetProducts = async () => {
    try {
      const response = await axios.get('https://ttcs-delta.vercel.app/api/v1/get-shoes');
      if (response.data && response.data.data) {
        setProducts(response.data.data);
        setNoProductsFound(false); // Đặt lại trạng thái khi tải lại sản phẩm
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  const applyFilters = () => {
    const filteredProducts = products.filter((product) => {
      const withinPriceRange =
        (!minPrice || product.price >= Number(minPrice)) &&
        (!maxPrice || product.price <= Number(maxPrice));

      const matchesBrand =
        selectedBrand
          ? product.brand.toLowerCase() === selectedBrand.toLowerCase()
          : true;

      return withinPriceRange && matchesBrand;
    });

    if (filteredProducts.length === 0) {
      setNoProductsFound(true); // Cập nhật trạng thái nếu không tìm thấy sản phẩm
    } else {
      setNoProductsFound(false);
    }

    setProducts(filteredProducts);
    setSearchModalVisible(false);
  };

  const resetFilters = () => {
    setSearchModalVisible(false);
    setMinPrice('');
    setMaxPrice('');
    setSelectedBrand('');
    handleGetProducts();
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>
        Giá: {item.price.toLocaleString()} VNĐ
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.advancedSearchButton}
        onPress={() => setSearchModalVisible(true)}
      >
        <Text style={styles.advancedSearchButtonText}>Tìm kiếm nâng cao</Text>
      </TouchableOpacity>

      {noProductsFound ? ( // Hiển thị thông báo nếu không tìm thấy sản phẩm
        <View>
          <Text style={styles.noProductsText}>Không tìm thấy sản phẩm</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.productGrid}
        />
      )}

      <Modal visible={searchModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tìm kiếm nâng cao</Text>

            {/* Dropdown chọn hãng */}
            <RNPickerSelect
              onValueChange={(value) => setSelectedBrand(value)}
              items={[
                { label: 'Nike', value: 'nike' },
                { label: 'Adidas', value: 'adidas' },
                { label: 'Puma', value: 'puma' },
              ]}
              placeholder={{
                label: 'Chọn hãng...',
                value: null,
                color: '#9EA0A4',
              }}
              style={{
                inputIOS: styles.input,
                inputAndroid: styles.input,
              }}
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
