import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { useColorScheme } from '../../hooks/useColorScheme';

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  showConfirmCancel?: boolean;
}

const { width } = Dimensions.get('window');

export default function CustomAlert({ visible, title, message, onClose, onConfirm, onCancel, showConfirmCancel = false }: CustomAlertProps) {
  const colorScheme = useColorScheme();

  const backgroundColor = colorScheme === 'dark' ? '#222' : '#fff';
  const textColor = colorScheme === 'dark' ? '#fff' : '#000';

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={[styles.container, { backgroundColor }]}
      >
        <Text style={[styles.title, { color: textColor }]}>{title}</Text>
        <Text style={[styles.message, { color: textColor }]}>{message}</Text>
        {showConfirmCancel ? (
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onCancel} style={[styles.button, styles.cancelButton]}>
              <Text style={[styles.buttonText, styles.cancelButtonText]}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} style={[styles.button, styles.confirmButton]}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={onClose} style={[styles.button, { backgroundColor: colorScheme === 'dark' ? '#FF7D2E' : '#FF7D2E' }]}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        )}
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
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    minWidth: 100,
  },
  confirmButton: {
    backgroundColor: '#FF7D2E',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  cancelButtonText: {
    color: '#333',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});