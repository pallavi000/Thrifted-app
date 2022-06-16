import axios  from 'axios';
import React, { useEffect } from 'react';
import { SafeAreaView ,Alert} from 'react-native';

import { KhatiSdk } from 'rn-all-nepal-payment';

const Khalti = (props) => {
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(()=>{
    setIsVisible(props.visible)
  },[props])

  const _onPaymentComplete = React.useCallback(async(data)=>{
    try {
      props.setIsSubmitting(true)
      props.setVisible(false);
      const str = data.nativeEvent.data;
      const resp = JSON.parse(str);
      if (resp.event === 'CLOSED') {
        // handle closed action
        props.setIsSubmitting(false)
      } else if (resp.event === 'SUCCESS') {
        const data = {
          total:props.subtotal+props.shippingFee,
          shipping:props.shippingFee,
          note: '',
          transaction_id:props.pid,
          payment_method:'khalti',
          amount: resp.data.amount,
          token: resp.data.token
        }
        await axios.post('/order',data, props.config)
        props.setIsSubmitting(false)
        props.orderSuccess()
      } else if (resp.event === 'ERROR') {
        props.setIsSubmitting(false)
        Alert.alert('Error','Payment Failed')
      }
      return;
    } catch (error) {
      props.setIsSubmitting(false)
      Alert.alert('Error', error.request.response)
    }
  })

  return (
    <SafeAreaView style={styles.container}>
      <KhatiSdk
        amount={props.total*100} // Number in paisa
        isVisible={isVisible} // Bool to show model
        paymentPreference={[
          // Array of services needed from Khalti
          'KHALTI',
        ]}
        productName={props.pid} // Name of product
        productIdentity={props.pid} // Unique product identifier at merchant
        onPaymentComplete={_onPaymentComplete} // Callback from Khalti Web Sdk
        productUrl='https://google.com'// Url of product
        publicKey={'test_public_key_28a78100166644c99e6692c7b0a4e7dd'} // Test or live public key which identifies the merchant
      />
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default Khalti;