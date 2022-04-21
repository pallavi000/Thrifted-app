import React from 'react';
import { Button, SafeAreaView } from 'react-native';

import { KhatiSdk } from 'rn-all-nepal-payment';

const Khalti = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const _onPaymentComplete = (data) => {
    setIsVisible(false);
    const str = data.nativeEvent.data;
    const resp = JSON.parse(str);
    // console.log({ resp })
    if (resp.event === 'CLOSED') {
      // handle closed action
    } else if (resp.event === 'SUCCESS') {
      // console.log({ data: resp.data })
    } else if (resp.event === 'ERROR') {
      // console.log({ error: resp.data })
    }
    return;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title={'Start Khalti'} onPress={() => setIsVisible(true)} />
      <KhatiSdk
        amount={100} // Number in paisa
        isVisible={isVisible} // Bool to show model
        paymentPreference={[
          // Array of services needed from Khalti
          'KHALTI',
          'EBANKING',
          'MOBILE_BANKING',
          'CONNECT_IPS',
          'SCT',
        ]}
        productName={'Dragon'} // Name of product
        productIdentity={'1234567890'} // Unique product identifier at merchant
        onPaymentComplete={_onPaymentComplete} // Callback from Khalti Web Sdk
        productUrl={'http://gameofthrones.wikia.com/wiki/Dragons'} // Url of product
        publicKey={'test_public_key_dc74e0fd57cb46cd93832aee0a390234'} // Test or live public key which identifies the merchant
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