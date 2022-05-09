import React,{useCallback,useEffect} from 'react';
import { Button, Text, SafeAreaView, Alert } from 'react-native';
import axios from 'axios'

import { EsewaSdk } from 'rn-all-nepal-payment';

const Esewa = (props) => {
  const [isVisible, setisVisible] = React.useState(false);
  const [response, setResponse] = React.useState('');

  

  const _onPaymentComplete = async (response) => {
    setResponse(response);
    props.setVisible(false)
    console.log(response)
    if(response.token) {
      const data = {
        amt:response.amount,
        rid: response.token,
        pid: props.pid
      }
      try {
        var response = await axios.post('/order/esewa/verify',data)
        Alert.alert('Success','Payment Success')
        props.orderSuccess()
        console.log(response.data)
      } catch (error) {
        console.log(error.message)
        Alert.alert('Error', 'Payment Failed')

      }
    } else {
      console.log('error')
      Alert.alert('Error','Payment Failed')
      
    }
    return
  }

  useEffect(()=>{
    setisVisible(props.visible)
  },[props])

  return (
    <SafeAreaView>
     

      <EsewaSdk
        amt={props.total} // Amount of product or item or ticket etc
        taxAmt={0} // Tax amount on product or item or ticket etc
        totalAmt={props.total} // Total payment amount including tax, service and deliver charge. [i.e tAmt = amt + txAmt + psc + tAmt]
        env={'EPAYTEST'} // Merchant code provided by eSewa
        testMode={true} // Boolean value for enabling test endpoint and real payment gateway
        isVisible={isVisible} // Bool to show modal
        onPaymentComplete={_onPaymentComplete} //  Callback from connectips Web Sdk
        pid={props.pid} // A unique ID of product or item or ticket etc
        failureURL={`http://merchant.com.np/page/esewa_payment_failed?q=fu`} // Failure URL: a redirect URL of merchant application where customer will be redirected after FAILURE or PENDING transaction
        successURL={`http://merchant.com.np/page/esewa_payment_success?q=su`} // Success URL: a redirect URL of merchant application where customer will be redirected after SUCCESSFUL transaction
        psc={0} // Product service charge amount
        pdc={0} // Product delivery charge amount
      />
    </SafeAreaView>
  );
}

export default Esewa;