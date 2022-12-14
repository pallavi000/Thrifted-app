import Toast from "react-native-root-toast";

export function apiErrorNotification(error) {
  customErrorNotification(error?.response?.data?.message);
}

export function customErrorNotification(msg) {
  Toast.show(msg || "Some Error Ocurred!", {
    duration: Toast.durations.LONG,
    position: -70,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor: "#dc3545",
    textColor: "#fff",
    opacity: 1,
  });
}

export function customSuccessNotification(msg) {
  Toast.show(msg || "Success!", {
    duration: Toast.durations.LONG,
    position: -70,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor: "#28a745",
    textColor: "#fff",
    opacity: 1,
  });
}
