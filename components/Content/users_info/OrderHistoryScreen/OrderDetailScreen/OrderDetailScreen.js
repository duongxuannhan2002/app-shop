import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderDetailScreen = ({ route }) => {
  const { orderId } = route.params; // Nhận orderId từ params
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm lấy chi tiết đơn hàng
  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`https://ttcs-delta.vercel.app/api/v1/get-detail-order?id_order=${orderId}`);
      
      if (response.data.massege === "ok") {
        setOrderDetails(response.data.data);
      } else {
        setError('Không thể lấy chi tiết đơn hàng.');
      }
    } catch (err) {
      console.error(err);
      setError('Có lỗi xảy ra khi lấy chi tiết đơn hàng.');
    } finally {
      setLoading(false);
    }
  };

  // Gọi hàm fetchOrderDetails khi component được mount
  useEffect(() => {
    fetchOrderDetails();
  }, []);

  // Render item chi tiết sản phẩm
  const renderOrderItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDetail}>Kích thước: {item.size}</Text>
      <Text style={styles.productDetail}>Số lượng: {item.quantity}</Text>
    </View>
  );

  // Xử lý khi đang tải hoặc có lỗi
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chi Tiết Đơn Hàng</Text>
      <FlatList
        data={orderDetails}
        renderItem={renderOrderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  productItem: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productDetail: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default OrderDetailScreen;