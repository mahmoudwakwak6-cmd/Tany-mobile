import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '../../context/AppContext';

export default function SignUp() {
  const router = useRouter();
  const { t, isDark, userRole } = useAppContext();
  
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', address: '' });

  const handleSignUp = () => {
    // هنا مستقبلاً هنضيف الـ API Call
    console.log("Signing up as:", userRole, form);
    router.replace('/(tabs)');
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, {backgroundColor: isDark ? '#121212' : '#FFF'}]}>
      <Text style={[styles.title, {color: isDark ? '#FFF' : '#333'}]}>{t('signup')} ({userRole})</Text>
      
      <TextInput style={styles.input} placeholder={t('fullName')} onChangeText={(text) => setForm({...form, name: text})} />
      <TextInput style={styles.input} placeholder={t('email')} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder={t('phone')} keyboardType="phone-pad" />
      <TextInput style={[styles.input, {height: 100}]} placeholder={t('address')} multiline textAlignVertical="top" />
      <TextInput style={styles.input} placeholder={t('password')} secureTextEntry />

      <TouchableOpacity style={styles.signupBtn} onPress={handleSignUp}>
        <Text style={styles.btnText}>{t('confirm')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 30, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: { backgroundColor: '#F5F5F5', padding: 15, borderRadius: 12, marginBottom: 15, textAlign: 'right' },
  signupBtn: { backgroundColor: '#009688', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});