import { StyleSheet, Dimensions } from 'react-native';


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
      margin: 5,
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ddd',
    },
    productImage: {
      width: 100,
      height: 100,
    },
    productName: {
      fontSize: 16,
      marginVertical: 5,
    },
    productPrice: {
      fontSize: 14,
      color: 'green',
    },
    productDescription: {
      fontSize: 12,
      color: '#666',
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

  export default styles;