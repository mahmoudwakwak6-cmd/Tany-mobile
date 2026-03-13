import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '../../context/AppContext';

export default function SignIn() {
  const router = useRouter();
  const { t, theme } = useAppContext();
  const isDark = theme === 'dark';

  // 1. تعريف الـ State لتخزين المدخلات
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 2. دالة التحقق من الشرط
  const handleLogin = () => {
    // الشرط: التأكد أن الخانتين ليستا فارغتين (trim لمسح المسافات الزائدة)
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert(
        theme === 'dark' ? 'Error' : 'تنبيه',
        theme === 'dark' ? 'Please fill in all fields' : 'برجاء ملء جميع الخانات أولاً'
      );
    } else {
      // لو تمام، بنستخدم replace عشان ميرجعش لصفحة الدخول تاني
      router.replace('/(tabs)');
    }
  };

  const styles = createStyles(isDark);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('login')}</Text>
      
      {/* خانة البريد الإلكتروني */}
      <TextInput 
        style={styles.input} 
        placeholder={t('email')} 
        placeholderTextColor="#888"
        value={email}
        onChangeText={(text) => setEmail(text)} // تحديث الإيميل
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* خانة كلمة المرور */}
      <TextInput 
        style={styles.input} 
        placeholder={t('password')} 
        secureTextEntry 
        placeholderTextColor="#888"
        value={password}
        onChangeText={(text) => setPassword(text)} // تحديث الباسوورد
      />

      {/* زر الدخول مع استدعاء دالة التحقق */}
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>{t('login')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footer}>
        <Text style={{color: isDark ? '#AAA' : '#666'}}>
          Don't have an account? <Text style={{color: '#009688', fontWeight: 'bold'}}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (isDark: boolean) => StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: isDark ? '#121212' : '#FFF', 
    padding: 30, 
    justifyContent: 'center' 
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: isDark ? '#FFF' : '#333', 
    marginBottom: 40, 
    textAlign: 'center' 
  },
  input: { 
    backgroundColor: isDark ? '#1E1E1E' : '#F5F5F5', 
    color: isDark ? '#FFF' : '#000', 
    padding: 18, 
    borderRadius: 15, 
    marginBottom: 15, 
    textAlign: 'right', // عشان الكتابة بالعربي تكون مظبوطة
    borderWidth: isDark ? 1 : 0,
    borderColor: '#333'
  },
  loginBtn: { 
    backgroundColor: '#009688', 
    padding: 18, 
    borderRadius: 15, 
    alignItems: 'center', 
    marginTop: 10,
    shadowColor: '#009688',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5
  },
  loginText: { 
    color: '#FFF', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  footer: {
    marginTop: 25,
    alignItems: 'center'
  }
});