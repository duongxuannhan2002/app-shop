import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { PRODUCT_DETAIL_SCREEN } from '../../contants/routers';

const CartScreen = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const navigation = useNavigation();

  // Hàm tính giá sau khi giảm giá
  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * (discount / 100));
  };

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const response = await axios.get(`https://ttcs-delta.vercel.app/api/v1/get-cart`, {
            params: { token },
          });
          const filteredProducts = response.data.data.map(product => ({
            id: product.id_product,
            name: product.name,
            image: product.image,
            price: product.price,
            discount: product.discount,
            quantity: product.quantity,
            size: product.size,
          }));
          setProductsData(filteredProducts);
        } else {
          console.log('Token not found');
        }
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartData();
  }, []);

  const toggleProduct = (product) => {
    if (selectedProducts.includes(product.id)) {
      setSelectedProducts(selectedProducts.filter(id => id !== product.id));
    } else {
      setSelectedProducts([...selectedProducts, product.id]);
    }
  };

  const removeProduct = (id) => {
    setSelectedProducts(selectedProducts.filter(selectedId => selectedId !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    setProductsData(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  const totalAmount = selectedProducts.reduce((total, selectedId) => {
    const product = productsData.find(item => item.id === selectedId);
    const discountedPrice = product ? calculateDiscountedPrice(product.price, product.discount) : 0;
    return total + (discountedPrice * (product ? product.quantity : 0));
  }, 0);

  const renderProduct = ({ item }) => {
    const isSelected = selectedProducts.includes(item.id);
    const discountedPrice = calculateDiscountedPrice(item.price, item.discount);

    return (
      <View style={styles.productContainer}>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => toggleProduct(item)}>
            <Icon name={isSelected ? 'checkbox' : 'square-outline'} size={24} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Image source={{ uri: item.image }} style={styles.productImage} />
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.productInfo}>
            <Text numberOfLines={1} style={styles.productName}>{item.name}</Text>

            <View style={styles.discountSizeContainer}>
              <Text style={styles.productPrice}>{item.price.toLocaleString()}đ</Text>
              <Text style={styles.productDiscount}>Giảm giá: {item.discount}%</Text>
            </View>

            <Text style={styles.productSize}>Size: {item.size}</Text>

            <View style={styles.quantityContainer}>
              <Text style={styles.label}>Số Lượng</Text>
              <View style={styles.quantityBox}>
                <TouchableOpacity onPress={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>
                  <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)}>
                  <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Hiển thị giá sau khi giảm giá */}
            <Text style={styles.discountedPrice}>
              Giá sau giảm: {(discountedPrice * item.quantity).toLocaleString()}đ
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.removeIcon} onPress={() => removeProduct(item.id)}>
          <Icon name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={productsData}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.footer}>
        <Text style={styles.totalText}>Tổng cộng: {totalAmount.toLocaleString()}đ</Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.buttonText}>Đặt hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  checkboxContainer: {
    marginRight: 10,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#e74c3c',
    fontWeight: 'bold',
    marginRight: 10,
  },
  productDiscount: {
    fontSize: 14,
    color: '#999',
  },
  productSize: {
    marginTop: 5,
    fontSize: 14,
    color: '#999',
  },
  quantityContainer: {
    // marginLeft: 10,
    // alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 5,
  },
  quantityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingLeft: 0,
    padding: 5,
  },
  quantityButton: {
    fontSize: 18,
    paddingHorizontal: 10,
    color: '#007BFF',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  removeIcon: {
    padding: 5,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  checkoutButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  discountedPrice: {
    fontSize: 14,
    color: '#28a745', // Màu xanh cho giá sau giảm
    fontWeight: 'bold',
    marginTop: 5, // Thêm khoảng cách giữa giá gốc và giá đã giảm
  },
  discountSizeContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
});

export default CartScreen;
