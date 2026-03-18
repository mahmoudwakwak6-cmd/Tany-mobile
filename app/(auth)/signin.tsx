import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '../../context/AppContext';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  const { setUserRole, setIsLoggedIn, isDark, t } = useAppContext();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // حالة لاختيار الدور (Default: customer)
  const [role, setRole] = useState<'customer' | 'factory'>('customer');

  const handleLogin = () => {
    // 1. تحديث الـ Role في الـ Context (ده اللي بيخفي التابات)
    setUserRole(role);
    // 2. تحديث حالة تسجيل الدخول
    setIsLoggedIn(true);
    // 3. التوجه للتابات
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}
    >
      <View style={styles.header}>
        <Ionicons name="leaf" size={80} color="#009688" />
        <Text style={[styles.title, { color: isDark ? '#FFF' : '#333' }]}>تاني - Tany</Text>
        <Text style={styles.subtitle}>أهلاً بك في عالم إعادة التدوير</Text>
      </View>

      <View style={styles.form}>
        {/* اختيار النوع (عميل أو مصنع) */}
        <View style={styles.roleContainer}>
          <TouchableOpacity 
            style={[styles.roleButton, role === 'customer' && styles.activeRole]} 
            onPress={() => setRole('customer')}
          >
            <Text style={[styles.roleText, role === 'customer' && styles.activeRoleText]}>عميل</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.roleButton, role === 'factory' && styles.activeRole]} 
            onPress={() => setRole('factory')}
          >
            <Text style={[styles.roleText, role === 'factory' && styles.activeRoleText]}>مصنع</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={[styles.input, { backgroundColor: isDark ? '#1E1E1E' : '#FFF', color: isDark ? '#FFF' : '#333' }]}
          placeholder="البريد الإلكتروني"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={[styles.input, { backgroundColor: isDark ? '#1E1E1E' : '#FFF', color: isDark ? '#FFF' : '#333' }]}
          placeholder="كلمة المرور"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>تسجيل الدخول</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerLink}>
          <Text style={{ color: '#009688' }}>ليس لديك حساب؟ إنشاء حساب جديد</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  header: { alignItems: 'center', marginBottom: 40 },
  title: { fontSize: 32, fontWeight: 'bold', marginTop: 10 },
  subtitle: { color: '#888', fontSize: 16 },
  form: { width: '100%' },
  roleContainer: { flexDirection: 'row', marginBottom: 20, borderRadius: 15, backgroundColor: '#EEE', padding: 5 },
  roleButton: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 12 },
  activeRole: { backgroundColor: '#009688' },
  roleText: { fontWeight: 'bold', color: '#666' },
  activeRoleText: { color: '#FFF' },
  input: { height: 55, borderRadius: 15, paddingHorizontal: 20, marginBottom: 15, borderWidth: 1, borderColor: '#DDD' },
  loginButton: { backgroundColor: '#009688', height: 55, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  loginButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  footerLink: { marginTop: 20, alignItems: 'center' }
});