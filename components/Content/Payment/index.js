import React from 'react';
import { WebView } from 'react-native-webview';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VNPayScreen = ({ route }) => {
  const { paymentUrl } = route.params;
  const navigation = useNavigation();

  const handleResponse = (event) => {
    const { url } = event;
    if (url.includes('vnp_TransactionStatus=')) {
      const transactionStatus = new URLSearchParams(url.split('?')[1]).get('vnp_TransactionStatus');

      if (transactionStatus === '00') {
        Alert.alert('Thanh toán thành công!', '', [
            { text: 'OK', onPress: () => navigation.goBack() }
          ]);
      } else {
        Alert.alert('Thanh toán thất bại!', '', [
            { text: 'OK', onPress: () => navigation.goBack() }
          ]);
      }
    }
  };

  return (
    <WebView
      source={{ uri: paymentUrl }}
      onNavigationStateChange={handleResponse}
    />
  );
};

export default VNPayScreen;
