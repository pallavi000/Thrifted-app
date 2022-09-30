import { Alert } from "react-native";

export function apiErrorNotification(error) {
  Alert.alert(
    "Error",
    error?.response?.data?.message || "Internal Server Error."
  );
}
