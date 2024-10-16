import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Header from '../Header';

const CartScreen = () => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [productsData, setProductsData] = useState([]);
    const [isCall, setIsCall] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    const response = await axios.get(`https://ttcs-delta.vercel.app/api/v1/get-cart`, {
                        params: { token },
                    });
                    let newid=0
                    const filteredProducts = response.data.data.map(product => ({
                        id_sort: newid++,
                        id:product.id_product,
                        name: product.name,
                        image: product.image,
                        price: product.price,
                        discount: product.discount,
                        quantity: product.quantity,
                        size: product.size,
                    }));
                    setProductsData(filteredProducts);
                    console.log(filteredProducts);
                    
                } else {
                    console.log('Token not found');
                }
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchCartData();
    }, [isCall]);

    const toggleProduct = (product) => {
        if (selectedProducts.includes(product.id_sort)) {
            setSelectedProducts(selectedProducts.filter(id => id !== product.id_sort));
        } else {
            setSelectedProducts([...selectedProducts, product.id_sort]);
        }
    };

    const removeProduct = async (item) => {
        let iduser = await AsyncStorage.getItem('userId');
        // console.log(iduser);
        // try {
        //     const response = await fetch('https://ttcs-delta.vercel.app/api/v1/delete-product-in-cart', {

        //         method: 'DELETE',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             id_user: 38,
        //             id_product: item.id,
        //             size: item.size,
        //         }),
        //     });
        //     const responseData = await response.json();
        //     console.log(responseData);
            
        // } catch (error) {
        //     console.error(error)
        // }
        

        try {
            setIsCall(true)
            const response = await axios.delete('https://ttcs-delta.vercel.app/api/v1/delete-product-in-cart', {
                data: {
                    id_user: iduser, 
                    id_product: item.id,
                    size: item.size,
                },
            });
            console.log(response.data); // Xử lý dữ liệu phản hồi nếu cần
            setIsCall(false)         
        } catch (error) {
            console.error('Error deleting product:', error);
            // Xử lý lỗi
        }
    };

    const updateQuantity = (id, newQuantity) => {
        setProductsData(prevProducts =>
            prevProducts.map(product =>
                product.id === id ? { ...product, quantity: newQuantity } : product
            )
        );
    };

    const totalAmount = selectedProducts.reduce((total, selectedId) => {
        const product = productsData.find(item => item.id_sort === selectedId);
        return total + product.price * (product ? product.quantity : 0);
    }, 0);

    const onCheckout = () => {
        const order = selectedProducts.map(selectedId => {
            const product = productsData.find(item => item.id_sort === selectedId);
            return {
                detail: product,
                size: product.size,
                quantity: product.quantity,
            };
        });
        navigation.navigate('OrderForm', { orders: order })
    };

    const renderProduct = ({ item }) => {
        const isSelected = selectedProducts.includes(item.id_sort);
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
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.removeIcon} onPress={() => removeProduct(item)}>
                    <Icon name="close" size={24} color="black" />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <>
            <Header></Header>
            <View style={styles.container}>
                <FlatList
                    data={productsData}
                    renderItem={renderProduct}
                    keyExtractor={(item) => (item.id_sort).toString()}
                />
                <View style={styles.footer}>
                    <Text style={styles.totalText}>Tổng cộng: {totalAmount.toLocaleString()}đ</Text>
                    <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
                        <Text style={styles.buttonText}>Đặt hàng</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center', // Căn giữa các thành phần theo chiều dọc
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        position: 'relative'
    },
    checkboxContainer: {
        marginRight: 10, // Khoảng cách giữa checkbox và hình ảnh
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        marginRight: 15, // Khoảng cách giữa hình ảnh và thông tin sản phẩm
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
        width: 85
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
        position: 'absolute', // Cố định vị trí cho icon "X"
        right: 10, // Căn lề phải
        top: '50%', // Căn giữa theo chiều dọc
        transform: [{ translateY: -12 }], // Điều chỉnh để icon nằm chính giữa
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