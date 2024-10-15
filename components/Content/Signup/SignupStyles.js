import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: width,      // Đặt chiều rộng theo chiều rộng của màn hình
        height: height,    // Đặt chiều cao theo chiều cao của màn hình
        justifyContent: 'center',
        alignItems: 'center',
      },
  container: {
    
    justifyContent: 'center',
    padding: 16,
    
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  signupButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default styles;