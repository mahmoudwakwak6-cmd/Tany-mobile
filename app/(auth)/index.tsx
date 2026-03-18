import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '../../context/AppContext';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeScreen() {
  const router = useRouter();
  const { setUserRole, t } = useAppContext();

  const handleChoice = (role: 'customer' | 'factory') => {
    setUserRole(role); // حفظ النوع في الـ Context
    Alert.alert(
      role === 'customer' ? 'مرحباً بك يا عميل' : 'مرحباً بك أيها المصنع',
      'هل تريد تسجيل الدخول أم إنشاء حساب جديد؟',
      [
        { text: t('login'), onPress: () => router.push('/(auth)/signin') },
        { text: t('signup'), onPress: () => router.push('/(auth)/signup') },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
         <Ionicons name="leaf" size={60} color="#009688" />
         <Text style={styles.logoText}>Green Cycle</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => handleChoice('customer')}>
          <Text style={styles.btnText}>{t('customer')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn} onPress={() => handleChoice('factory')}>
          <Text style={styles.secondaryBtnText}>{t('factory')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 30, justifyContent: 'center', alignItems: 'center' },
  header: { alignItems: 'center', marginBottom: 60 },
  logoText: { fontSize: 32, fontWeight: 'bold', color: '#009688', marginTop: 10 },
  content: { width: '100%' },
  primaryBtn: { backgroundColor: '#009688', padding: 20, borderRadius: 15, alignItems: 'center', marginBottom: 20 },
  secondaryBtn: { backgroundColor: '#fff', padding: 20, borderRadius: 15, alignItems: 'center', borderWidth: 2, borderColor: '#009688' },
  btnText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  secondaryBtnText: { color: '#009688', fontSize: 20, fontWeight: 'bold' }
});