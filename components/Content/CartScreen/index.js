import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const productsData = [
  { id: '1', name: 'Shoe 1', price: 100, image: require('../../../assets/image/s2.jpeg') },
  { id: '2', name: 'Shoe 2', price: 200, image: require('../../../assets/image/s2.jpeg') },
  { id: '3', name: 'Shoe 3', price: 300, image: require('../../../assets/image/s2.jpeg') },
  // Thêm các sản phẩm khác nếu cần
];

const CartScreen = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);

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

  const totalAmount = selectedProducts.reduce((total, selectedId) => {
    const product = productsData.find(item => item.id === selectedId);
    return total + (product ? product.price : 0);
  }, 0);

  const renderProduct = ({ item }) => {
    const isSelected = selectedProducts.includes(item.id);

    return (
      <View style={styles.productContainer}>
        <TouchableOpacity style={styles.productItem} onPress={() => toggleProduct(item)}>
          <Image source={item.image} style={styles.productImage} />
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>${item.price}</Text>
          <Icon name={isSelected ? 'checkbox' : 'square-outline'} size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.removeIcon} onPress={() => removeProduct(item.id)}>
          <Icon name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={productsData}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ${totalAmount}</Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.buttonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center'

  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  productName: {
    flex: 1,
  },
  productPrice: {
    marginRight: 10,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ddd',
    alignItems: 'flex-end',
    flexDirection: 'row'
,justifyContent: 'space-between'
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  removeIcon: {
    width :'100%',
    flex: 1
  }
});

export default CartScreen;
