import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity, Modal, ScrollView, TextInput,
  Alert,
} from 'react-native';

const DetailProduct = ({ route }) => {
  const { product } = route.params;
  const [data, setData] = useState({});
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true); // Thêm biến trạng thái loading
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [remain, setRemain] = useState(null)
  const [quantity, setQuantity] = useState('');


  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true); // Bắt đầu tải dữ liệu
    fetch(`https://ttcs-delta.vercel.app/api/v1/get-1-product?id=${product}`)
      .then((response) => response.json())
      .then((json) => {
        setData(json.data); // Đặt dữ liệu
        setLoading(false); // Kết thúc tải dữ liệu

        if (json.data && json.data.length > 0 && json.data[0].size) {
          const listSize = json.data[0].size.split(",");
          setSizes(listSize); // Đặt danh sách kích thước
        } else {
          console.log("Không tìm thấy dữ liệu size");
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Kết thúc tải dữ liệu ngay cả khi có lỗi
      });
  }, []);


  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handlePressSize = (size) => {
    if (selectedSize == size) {
      setSelectedSize(null);
    } else {
      setSelectedSize(size);
      fetch(`https://ttcs-delta.vercel.app/api/v1/get-quantity?id=${data[0].id}&size=${size}`)
        .then((response) => response.json())
        .then((json) => {
          setRemain(json.data[0].quantity);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handlePressAdd = async () => {
    if (!selectedSize) {
      Alert.alert('Vui lòng chọn size');
    } else {
      if (!data || data.length === 0) {
        console.error('Không có dữ liệu sản phẩm');
        return; // Ngưng thực hiện nếu không có dữ liệu
      }

      const idProduct = data[0].id; // Truy cập id chỉ khi data có giá trị
      try {
        let token = await AsyncStorage.getItem('token');
        const response = await fetch('https://ttcs-delta.vercel.app/api/v1/post-product-to-cart', {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({

            token: token,
            id_product: idProduct, // Chuyển id_product thành chuỗi
            size: selectedSize, // Chuyển selectedSize thành chuỗi
            quantity: 1 // Cố định số lượng là 1, có thể thay đổi theo nhu cầu
          }),
        });

        // Kiểm tra phản hồi  
        const responseData = await response.json();
        Alert.alert(responseData.messSuc ? 'Đã Thêm vào giỏ hàng' : 'Sản phẩm đã có sẵn trong giỏ hàng')
      } catch (error) {
        console.error('Error:', error); // xử lý lỗi
      }

      toggleModal();
    }
  };


  const handlePressBuy = () => {
    if (!selectedSize) {
      Alert.alert('Vui lòng chọn size')
    } else
      if (!quantity) {
        Alert.alert('vui lòng nhập số lượng')
      } else
        if (quantity > remain || quantity <= 0) {
          Alert.alert('Số lượng không hợp lệ');
        } else {
          const order = []
          order[0] = {
            detail: data[0],
            size: selectedSize,
            quantity: quantity
          }
          navigation.navigate('OrderForm', { orders: order }
          )
        }
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Đang tải dữ liệu...</Text> // Hiển thị thông báo khi đang tải
      ) : (
        <>
          {/* Phần hình ảnh sản phẩm */}
          <Image
            source={{ uri: data[0].image }} // Thay bằng link ảnh thực tế
            style={styles.productImage}
          />

          {/* Phần giá tiền */}
          <Text style={styles.price}>Giá: {data[0].price + 'đ'}</Text>

          {/* Tên sản phẩm */}
          <Text style={styles.productName}>
            {data.name}
          </Text>

          {/* Đánh giá sản phẩm */}
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingLabel}>Số lượng đã bán:</Text>
            <Text style={styles.ratingScore}>{data[0].sold}</Text>
          </View>

          <View style={styles.ratingContainer}>
            <Text style={styles.ratingLabel}>Hãng:</Text>
            <Text style={styles.ratingScore}>{data[0].brand}</Text>
          </View>

          {/* Bọc phần mô tả sản phẩm trong ScrollView để có thể cuộn */}
          <ScrollView style={styles.descriptionContainer}>
            <Text style={styles.description}>
              {data[0].describ}
            </Text>
          </ScrollView>

          {/* Nút bấm */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.addToCartButton} onPress={toggleModal}>
              <Text style={styles.buttonText}>Add to cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.orderButton} onPress={toggleModal}>
              <Text style={styles.buttonText}>Đặt hàng</Text>
            </TouchableOpacity>
          </View>

          {/* Modal xuất hiện khi bấm nút */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={toggleModal}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <TouchableOpacity onPress={toggleModal}>
                  <Text style={styles.closeButton}>∨</Text>
                </TouchableOpacity>

                <ScrollView>
                  <View style={styles.modalBody}>
                    <Image
                      source={{ uri: data[0].image }} // Thay bằng link ảnh thực tế
                      style={styles.modalImage}
                    />

                    <Text style={styles.stockText}>Còn lại: {selectedSize ? remain : ''}</Text>

                    <Text style={styles.sizeLabel}>Chọn size</Text>
                    <View style={styles.sizeContainer}>
                      <View style={styles.sizeRow}>
                        {sizes.length > 0 ? (
                          sizes.map((size, index) => (
                            <TouchableOpacity key={index} onPress={() => handlePressSize(size)}>
                              <Text style={[styles.size, selectedSize === size && styles.selectedSize]}>
                                {size}
                              </Text>
                            </TouchableOpacity>
                          ))
                        ) : (
                          <Text>Không có kích thước</Text>
                        )}
                      </View>
                    </View>

                    <Text style={styles.quantityLabel}>Số lượng mua:</Text>
                    <TextInput
                      style={styles.quantityInput}
                      keyboardType="numeric"
                      value={quantity} // Đặt giá trị của TextInput theo biến trạng thái
                      onChangeText={(text) => setQuantity(text)} // Cập nhật giá trị khi người dùng nhập
                    />

                    {/* Nút hành động trong modal */}
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity style={styles.addToCartButton} onPress={() => handlePressAdd()}>
                        <Text style={styles.buttonText}>Add to cart</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.orderButton} onPress={() => handlePressBuy()}>
                        <Text style={styles.buttonText}>Đặt hàng</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#DDDDDD',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    margin: 16,
  },
  productImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  price: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'red'
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingLabel: {
    fontSize: 14,
    marginRight: 8,
  },
  ratingScore: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    maxHeight: '10%', // Giới hạn chiều cao cuộn
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  addToCartButton: {
    backgroundColor: '#a0d6a0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  orderButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: '70%'
  },
  closeButton: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 16,
  },
  modalBody: {
    paddingBottom: 16,
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 16,
    alignSelf: 'center',
    borderBottomColor: 'red',
    borderBottomWidth: 1
  },
  stockText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  sizeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sizeContainer: {
    flexDirection: 'column',
    marginBottom: 16,
  },
  sizeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  size: {
    backgroundColor: '#aaa',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },

  selectedSize: {
    backgroundColor: 'red'
  },

  quantityLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 8,
    textAlign: 'center',
  },
});

export default DetailProduct;
