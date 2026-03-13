import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoRow}>
           <Ionicons name="leaf" size={32} color="#009688" />
           <Text style={styles.logoText}>Green Cycle</Text>
        </View>
        <Ionicons name="basket-outline" size={35} color="#009688" />
      </View>

      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.primaryBtn} 
          onPress={() => router.push('/(auth)/signin')}
        >
          <Text style={styles.btnText}>Customer</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryBtn}
          onPress={() => router.push('/(auth)/signin')}
        >
          <Text style={styles.secondaryBtnText}>Factory</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 30, justifyContent: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 80 },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logoText: { fontSize: 24, fontWeight: 'bold', color: '#009688', marginLeft: 10 },
  content: { width: '100%' },
  primaryBtn: { backgroundColor: '#009688', padding: 18, borderRadius: 12, alignItems: 'center', marginBottom: 15 },
  secondaryBtn: { backgroundColor: '#fff', padding: 18, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#009688' },
  btnText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  secondaryBtnText: { color: '#009688', fontSize: 18, fontWeight: '600' }
});