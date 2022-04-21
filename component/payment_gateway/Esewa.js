import React from 'react';
import { Button, Text, SafeAreaView } from 'react-native';

import { EsewaSdk } from 'rn-all-nepal-payment';

const Esewa = () => {
  const [isVisible, setisVisible] = React.useState(false);
  const [response, setResponse] = React.useState('');

  const _onPaymentComplete = (response) => {
    setResponse(response);
    setisVisible(false);
    return
  }

  return (
    <SafeAreaView>
      <Button
        title={'Esewa test'}
        onPress={() => setisVisible(true)}
        style={{ width: 100, height: 50, backgroundColor: 'red' }}
      />
      {response?.token && <Text>{`ref id: ${response.token}`}</Text>}

      <EsewaSdk
        amt={100} // Amount of product or item or ticket etc
        taxAmt={5} // Tax amount on product or item or ticket etc
        totalAmt={105} // Total payment amount including tax, service and deliver charge. [i.e tAmt = amt + txAmt + psc + tAmt]
        env={'EPAYTEST'} // Merchant code provided by eSewa
        testMode={true} // Boolean value for enabling test endpoint and real payment gateway
        isVisible={isVisible} // Bool to show modal
        onPaymentComplete={_onPaymentComplete} //  Callback from connectips Web Sdk
        pid={"ee2c3ca1-696b-4cc5-a6be-2c40d929d43"} // A unique ID of product or item or ticket etc
        failureURL={`http://merchant.com.np/page/esewa_payment_failed?q=fu`} // Failure URL: a redirect URL of merchant application where customer will be redirected after FAILURE or PENDING transaction
        successURL={`http://merchant.com.np/page/esewa_payment_success?q=su`} // Success URL: a redirect URL of merchant application where customer will be redirected after SUCCESSFUL transaction
        psc={0} // Product service charge amount
        pdc={0} // Product delivery charge amount
      />
    </SafeAreaView>
  );
}

export default Esewa;