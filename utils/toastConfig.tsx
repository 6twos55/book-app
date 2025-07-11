import { BaseToast, ErrorToast, ToastProps } from "react-native-toast-message";

// Make toast show above modal

export const toastConfig = {
  success: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: 'green',
        zIndex: 9999,
        elevation: 9999,
      }}
    />
  ),
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: 'red',
        zIndex: 9999,
        elevation: 9999,
      }}
    />
  ),
  info: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: 'dodgerblue',
        backgroundColor: '#eef6ff',
        zIndex: 9999,
        elevation: 9999,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: '600',
        color: '#2e6fb0',
      }}
      text2Style={{
        fontSize: 14,
        color: '#2e6fb0',
      }}
    />
  ),
};