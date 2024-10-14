import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ORDER_DETAILS } from '../../../contants/routers';

const OrderHistoryScreen = () => {
  const navigation = useNavigation(); // Khai báo navigation
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm lấy danh sách đơn hàng
  const fetchOrders = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId'); // Lấy userId từ AsyncStorage
      const response = await axios.get(`https://ttcs-delta.vercel.app/api/v1/get-all-order?id_user=${userId}`);
      
      if (response.data.massege === "ok") {
        setOrders(response.data.data);
      } else {
        setError('Không thể lấy danh sách đơn hàng.');
      }
    } catch (err) {
      console.error(err);
      setError('Có lỗi xảy ra khi lấy danh sách đơn hàng.');
    } finally {
      setLoading(false);
    }
  };

  // Gọi hàm fetchOrders khi component được mount
  useEffect(() => {
    fetchOrders();
  }, []);

  

  // Render item đơn hàng
  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderText}>Mã đơn hàng: {item.id}</Text>
      <Text style={styles.orderText}>Ngày đặt: {item.order_date}</Text>
      <Text style={styles.orderText}>Địa chỉ: {item.address}</Text>
      <Text style={styles.orderText}>Số điện thoại: {item.phone_number}</Text>
      <Text style={styles.orderText}>Tổng giá: {item.total_price} VND</Text>
      <Text style={styles.orderText}>Hình thức thanh toán: {item.payment}</Text>
      <Text style={styles.orderText}>Trạng thái: {item.status}</Text>
      <Button title="Xem Chi Tiết" onPress={() => navigation.navigate(ORDER_DETAILS, { orderId: item.id })} />
      <View style={styles.separator} />
    </View>
  );

  // Xử lý khi có lỗi
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
      <Text style={styles.title}>Lịch Sử Đơn Hàng</Text>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id.toString()}
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
  orderItem: {
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
  orderText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
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

export default OrderHistoryScreen;
