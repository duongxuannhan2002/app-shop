import { StyleSheet, Dimensions  } from 'react-native';
const { width, height } = Dimensions.get('window'); // Lấy chiều rộng và chiều cao của màn hình

styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,      // Đặt chiều rộng theo chiều rộng của màn hình
    height: height,    // Đặt chiều cao theo chiều cao của màn hình
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    
    width: width,   
    height: height,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default styles;
