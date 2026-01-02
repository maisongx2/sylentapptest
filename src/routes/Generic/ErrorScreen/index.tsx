import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useErrorScreen } from './useErrorScreen';

export const ErrorScreen = () => {
  const { data, handleButtonPress } = useErrorScreen();

  return (
    <Modal animationType="fade" transparent statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>{data?.title}</Text>

            <Text style={styles.description}>{data?.description}</Text>

            {data?.errorCode && (
              <View style={styles.errorCodeContainer}>
                <Text style={styles.errorCodeLabel}>Código do erro:</Text>
                <Text style={styles.errorCode}>{data?.errorCode}</Text>
              </View>
            )}
          </View>

          <View style={styles.buttons}>
            {data?.primaryButton && (
              <TouchableOpacity
                style={[styles.button, styles.primaryButton]}
                onPress={() => handleButtonPress(data?.primaryButton)}
              >
                <Text style={styles.primaryButtonText}>
                  {data?.primaryButton.label}
                </Text>
              </TouchableOpacity>
            )}

            {data?.secondaryButton && (
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={() => handleButtonPress(data?.secondaryButton)}
              >
                <Text style={styles.secondaryButtonText}>
                  {data?.secondaryButton.label}
                </Text>
              </TouchableOpacity>
            )}

            {data?.tertiaryButton && (
              <TouchableOpacity
                style={styles.tertiaryButton}
                onPress={() => handleButtonPress(data?.tertiaryButton)}
              >
                <Text style={styles.tertiaryButtonText}>
                  {data?.tertiaryButton.label}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    overflow: 'hidden',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  errorCodeContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  errorCodeLabel: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },
  errorCode: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    fontFamily: 'monospace',
  },
  buttons: {
    padding: 24,
    gap: 12,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: '#F5F5F5',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  tertiaryButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  tertiaryButtonText: {
    fontSize: 14,
    color: '#999999',
  },
});
