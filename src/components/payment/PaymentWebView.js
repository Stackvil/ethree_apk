import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet, Text, ActivityIndicator, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { X } from 'lucide-react-native';

export default function PaymentWebView({ visible, url, onCancel, onSuccess, onFailure }) {
  const handleNavigationStateChange = (navState) => {
    const { url: currentUrl } = navState;
    
    // Check for success markers
    if (currentUrl.includes('status=success') || currentUrl.includes('payment=success') || currentUrl.includes('success')) {
      onSuccess();
    } 
    // Check for failure markers
    else if (currentUrl.includes('status=failure') || currentUrl.includes('payment=failure') || currentUrl.includes('failure')) {
      onFailure();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Secure Payment</Text>
          <TouchableOpacity onPress={onCancel} style={styles.closeButton}>
            <X size={28} color="#0f172a" />
          </TouchableOpacity>
        </View>
        
        {url ? (
          <WebView
            source={{ uri: typeof url === 'string' ? url : url.uri }}
            onNavigationStateChange={handleNavigationStateChange}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              handleNavigationStateChange(nativeEvent);
            }}
            startInLoadingState={true}
            renderLoading={() => (
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="#FEC105" />
              </View>
            )}
          />
        ) : (
          <View style={styles.error}>
            <Text>Error: Invalid Payment URL</Text>
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#0f172a' },
  closeButton: { padding: 5 },
  loading: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  error: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
