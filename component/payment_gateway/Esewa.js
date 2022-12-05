import React, { useCallback, useEffect } from "react";
import { SafeAreaView, Alert } from "react-native";
import axios from "axios";

import { EsewaSdk } from "rn-all-nepal-payment";
import { apiErrorNotification, customErrorNotification } from "../ErrorHandle";

const Esewa = (props) => {
  const [isVisible, setisVisible] = React.useState(false);
  const [response, setResponse] = React.useState("");

  const _onPaymentComplete = useCallback(async (response) => {
    setResponse(response);
    props.setVisible(false);
    props.setIsSubmitting(true);
    if (response.token) {
      const data = {
        total: props.subtotal + props.shippingFee,
        shipping: props.shippingFee,
        note: "",
        transaction_id: props.pid,
        payment_method: "esewa",
        amt: response.amount,
        rid: response.token,
        pid: props.pid,
        shipping_id: props.shippingAddress?._id,
        deliveryOption: props.deliveryOption,
        billing_id: props.sameBilling
          ? props.shippingAddress?._id
          : props.billingAddress?._id,
      };
      try {
        await axios.post("/order", data, props.config);
        Alert.alert("Success", "Payment Success");
        props.setIsSubmitting(false);
        props.orderSuccess();
      } catch (error) {
        props.setIsSubmitting(false);
        apiErrorNotification(error);
      }
    } else {
      props.setIsSubmitting(false);
      customErrorNotification("Payment Cancelled.");
    }
    return;
  });

  useEffect(() => {
    setisVisible(props.visible);
  }, [props]);

  return (
    <SafeAreaView>
      <EsewaSdk
        amt={props.total} // Amount of product or item or ticket etc
        taxAmt={0} // Tax amount on product or item or ticket etc
        totalAmt={props.total + props.shippingFee} // Total payment amount including tax, service and deliver charge. [i.e tAmt = amt + txAmt + psc + tAmt]
        env={process.env.ESEWA_PUBLIC_KEY || "NP-ES-TMPVT"} // Merchant code provided by eSewa
        testMode={false} // Boolean value for enabling test endpoint and real payment gateway
        isVisible={isVisible} // Bool to show modal
        onPaymentComplete={_onPaymentComplete} //  Callback from connectips Web Sdk
        pid={props.pid} // A unique ID of product or item or ticket etc
        failureURL={`https://hamrocloset.com/payment-failed`} // Failure URL: a redirect URL of merchant application where customer will be redirected after FAILURE or PENDING transaction
        successURL={`https://hamrocloset.com/payment-success`} // Success URL: a redirect URL of merchant application where customer will be redirected after SUCCESSFUL transaction
        psc={0} // Product service charge amount
        pdc={0} // Product delivery charge amount
      />
    </SafeAreaView>
  );
};

export default Esewa;
