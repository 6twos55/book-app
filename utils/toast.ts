import Toast from "react-native-toast-message";

export const showToast = (
  type: "success" | "error" | "info" | "offlineNotification",
  title: string,
  message?: string,
  position: "top" | "bottom" = "top"
) => {
  Toast.show({
    type,
    text1: title,
    text1Style: { fontSize: 14 },
    text2: message,
    text2Style: { fontSize: 12 },
    position,
    visibilityTime: 3500,
  });
};
