import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, Button, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const OrderForm = ({ route }) => {
  const { orders } = route.params

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [addressDetails, setAddressDetails] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on delivery');
  const [totalPrice, setTotalPrice] = useState(0)
  const [products, setProducts] = useState([])
  const navigation = useNavigation()
  useEffect(() => {
    let total = 0; // Sử dụng let thay vì const
    let arrPrd = []
    orders.forEach((order) => {
      total += order.detail.price * order.quantity; // Tính tổng
      arrPrd.push(
        {
          id_product: order.detail.id,
          id_size: order.size,
          quantity: order.quantity
        }
      )
    });
    setTotalPrice(total); // Gọi setTotalPrice một lần
    setProducts(arrPrd);
  }, []);

  const handlePressOrder = async () => {

    const now = new Date();
    const time = now.getHours() + ':' + now.getMinutes() + ' ' + now.getDate() + '-' + now.getMonth() + '-' + now.getFullYear()
    if (!fullName) {
      Alert.alert("Vui lòng nhập tên");
    } else if (!phone) {
      Alert.alert("Vui lòng nhập số điện thoại")
    } else if (!addressDetails) {
      Alert.alert('Vui lòng nhập địa chỉ')
    } else {
      if (paymentMethod == "Cash on delivery") {
        try {
          let iduser = await AsyncStorage.getItem('userId');
          Alert.alert('Vui lòng chờ...')
          const response = await fetch('https://ttcs-delta.vercel.app/api/v1/post-order', {

            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id_user: iduser, // Thay thế bằng token thật
              order_date: time, // Chuyển id_product thành chuỗi
              address: addressDetails,
              phoneNumber: phone,
              totalPrice: totalPrice,
              payment: paymentMethod,
              status: "đã đặt hàng",
              products: products
            }),
          });

          // Kiểm tra phản hồi  
          const responseData = await response.json();
          Alert.alert(responseData.message)
          console.log(responseData);
        } catch (error) {
          console.error('Error:', error); // xử lý lỗi
        }
      } else {
        try {
          Alert.alert('Vui lòng chờ...')
          const response = await fetch(`https://ttcs-delta.vercel.app/api/v1/payment?amount=${totalPrice}`);

          // Kiểm tra phản hồi  
          const responseData = await response.json();
          navigation.navigate('Vnpay', { paymentUrl: responseData.data.vnpUrl })
          console.log(responseData);

        } catch (error) {
          console.error('Error:', error); // xử lý lỗi
        }
      }
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.scrollProductContainer}>
          <ScrollView contentContainerStyle={styles.scrollProduct}>
            {orders.map((order, index) => (
              <View style={styles.cartItem} key={index}>
                <Image
                  source={{ uri: order.detail.image }}
                  style={styles.productImage}
                />
                <View style={styles.cartDetails}>
                  <Text style={styles.productName}>{order.detail.name}</Text>
                  <Text style={styles.quantity}>Size: {order.detail.size}</Text>
                  <Text style={styles.quantity}>SL: {order.quantity}</Text>
                  <Text style={styles.price}>{order.detail.price * order.quantity}đ</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        {/* Order Form */}
        <View style={styles.form}>
          <Text style={styles.label}>FullName</Text>
          <TextInput style={styles.input} value={fullName} onChangeText={setFullName} />

          <Text style={styles.label}>Phone</Text>
          <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          <Text style={styles.label}>Địa chỉ</Text>
          <TextInput
            style={styles.input}
            value={addressDetails}
            onChangeText={setAddressDetails}
            multiline={true}
          />

          {/* Payment Method */}
          <Text style={styles.label}>Hình thức thanh toán</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={paymentMethod}
              style={styles.picker}
              onValueChange={(itemValue) => setPaymentMethod(itemValue)}
            >
              <Picker.Item label="Thanh toán khi nhận hàng" value="Cash on delivery" />
              <Picker.Item label="Thanh toán VNPay" value="Credit Card" />
            </Picker>
          </View>
        </View>
      </ScrollView>

      {/* Total Price and Order Button */}
      <View style={styles.footer}>
        <Text style={styles.total}>Total: {totalPrice}</Text>
        <Button title="Đặt hàng" onPress={() => handlePressOrder()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },

  scrollContent: {
    paddingBottom: 20,
  },

  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  cartDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantity: {
    color: '#666',
  },
  price: {
    color: 'red',
    fontSize: 16,
  },
  removeButton: {
    padding: 5,
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
  },
  removeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  form: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default OrderForm;
