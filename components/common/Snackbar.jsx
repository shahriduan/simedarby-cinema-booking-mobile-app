import { Snackbar } from 'react-native-paper';

const CustomSnackbar = ({ visible, message, onDismiss }) => {
  return (
    <Snackbar visible={visible} onDismiss={onDismiss} duration={3000}>
      {message}
    </Snackbar>
  );
};

export default CustomSnackbar;