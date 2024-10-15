import { Text, View, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from 'react';
import Header from "../Header";  // Đảm bảo Header đã được import đúng
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('https://ttcs-delta.vercel.app/api/v1/get-shoes') // Gọi API
          .then((response) => response.json()) // Chuyển đổi dữ liệu nhận được thành JSON
          .then((json) => {
            setData(getRandomItems(json.data,6))
             // Lưu dữ liệu vào state
          })
          .catch((error) => {
            console.error(error); // Bắt lỗi nếu có
          });
      }, []);
    const images = [
        require('../../../assets/image/s1.jpeg'),
        require('../../../assets/image/s2.jpeg'),
        require('../../../assets/image/s3.jpeg'),
        // Thêm các hình khác
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const getRandomItems = (arr, count) => {
        const shuffled = arr.sort(() => 0.5 - Math.random()); // Xáo trộn mảng
        return shuffled.slice(0, count); // Lấy 4 phần tử đầu tiên
    };

    // Mỗi 3 giây đổi hình một lần
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // 3000ms = 3 giây

        // Hủy bỏ interval khi component bị unmount
        return () => clearInterval(intervalId);
    }, []);

    const navigation = useNavigation();


    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.productContainer}
            onPress={() => navigation.navigate('ProductDetails', { product: item.id })} // Điều hướng với thông tin sản phẩm
        >
            {/* <View > */}
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price + 'Đ'}</Text>
            {/* </View> */}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Header style={styles.header} />
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2} // Sử dụng để chia lưới 2 cột
                ListHeaderComponent={() => (
                    <View>
                        <Image source={images[currentImageIndex]} style={styles.image} />
                        <Text style={styles.title}>Gợi ý hôm nay</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative', // Đặt vị trí tương đối cho container
    },
    header: {
        position: 'absolute', // Giữ header luôn ở trên cùng
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1, // Đảm bảo header nằm trên cùng của các thành phần khác
        backgroundColor: 'white', // Đặt màu nền nếu cần
    },
    image: {
        width: 360,
        height: 300,
        resizeMode: 'cover',
        margin: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#f48c8c',
        textAlign: 'left',
    },
    productContainer: {
        flex: 1,
        margin: 10,
        padding: 10,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#dcdcdc',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
    },
    productImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    productName: {
        marginTop: 10,
        fontSize: 14,
    },
    productPrice: {
        marginTop: 5,
        color: 'red',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
