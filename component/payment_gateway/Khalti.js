import axios  from 'axios';
import React, { useEffect } from 'react';
import { Button, SafeAreaView ,Alert} from 'react-native';

import { KhatiSdk } from 'rn-all-nepal-payment';

const Khalti = (props) => {
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(()=>{
    setIsVisible(props.visible)
    console.log(props.pid)
  },[props])

  const _onPaymentComplete = async(data) => {
    props.setVisible(false);
    const str = data.nativeEvent.data;
    const resp = JSON.parse(str);
    if (resp.event === 'CLOSED') {
      // handle closed action
    } else if (resp.event === 'SUCCESS') {
      try {
        const data= {
          token:resp.data.token,
          amount:resp.data.amount
        }
        var response = await axios.post('/order/khalti/verify',data)
        Alert.alert('Success','Payment Success')
        props.orderSuccess()
      } catch (error) {

        Alert.alert('Error','Payment Failed')
      }
    } else if (resp.event === 'ERROR') {
      Alert.alert('Error','Payment Failed')
    }
    return;
  };

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