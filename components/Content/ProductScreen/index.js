import React, { useEffect, useState } from 'react';
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
import Header from '../Header';
import { useNavigation } from '@react-navigation/native';


export default function ProductScreen() {
    const [products, setProducts] = useState();
    const [searchModalVisible, setSearchModalVisible] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [data, setData] = useState();

    const navigation = useNavigation();

    useEffect(() => {
        fetch('https://ttcs-delta.vercel.app/api/v1/get-shoes') // Gọi API
          .then((response) => response.json()) // Chuyển đổi dữ liệu nhận được thành JSON
          .then((json) => {
            setProducts(json.data)
            setData(json.data)
             // Lưu dữ liệu vào state
          })
          .catch((error) => {
            console.error(error); // Bắt lỗi nếu có
          });
      }, []);

    const applyFilters = () => {
        let productData = data
        const filteredProducts = productData.filter((product) => {
            const withinPriceRange =
                (!minPrice || product.price >= Number(minPrice)) &&
                (!maxPrice || product.price <= Number(maxPrice));
                const matchesBrand = selectedBrand ? product.brand.toLowerCase() === selectedBrand.toLowerCase() : true;
            return withinPriceRange && matchesBrand;
        });

        setProducts(filteredProducts);
        setSearchModalVisible(false); // Đóng modal sau khi lọc
    };

    const resetFilters = () => {
        setProducts(data); // Khôi phục tất cả sản phẩm
        setSelectedBrand('');
        setMinPrice('');
        setMaxPrice('');
        setSearchModalVisible(false);
    };

    const renderProduct = ({ item }) => (
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
        <>
        <Header></Header>
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
        </>
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
        maxWidth: '45%'
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