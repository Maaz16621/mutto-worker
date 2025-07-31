import React from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { useColorScheme } from '../../hooks/useColorScheme';

interface CouponModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (coupon: string) => void;
}

const { width } = Dimensions.get('window');

export default function CouponModal({ visible, onClose, onApply }: CouponModalProps) {
  const colorScheme = useColorScheme();
  const [coupon, setCoupon] = React.useState('');

  const backgroundColor = colorScheme === 'dark' ? '#222' : '#fff';
  const textColor = colorScheme === 'dark' ? '#fff' : '#000';

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={[styles.container, { backgroundColor }]}
      >
        <Text style={[styles.title, { color: textColor }]}>Apply Coupon</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Coupon Code"
          onChangeText={setCoupon}
        />
        <TouchableOpacity onPress={() => onApply(coupon)} style={styles.button}>
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    borderRadius: 15,
    padding: 20,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF7D2E',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
