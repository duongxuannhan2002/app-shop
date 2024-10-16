import { StyleSheet, Dimensions } from 'react-native';
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
    color:'#aaffff'
  },
  input: {
    height: 50,
    borderColor: 'gray',
    color: '#aaffff',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10
  },
  textSignUp: {
    textAlign: 'right',
    fontSize: 16,
    color: '#aaffff',
    paddingTop: 5,
    textDecorationLine: 'underline',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: '#fff',
  },
  eyeButton: {
    padding: 10,
  },
  eyeText: {
    fontSize: 24,
  },
});

export default styles;