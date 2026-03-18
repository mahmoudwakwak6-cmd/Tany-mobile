import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '../../context/AppContext';

export default function ProfileScreen() {
  const { isDark, userRole, setUserRole, setIsLoggedIn } = useAppContext();
  const router = useRouter();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null); // دلوقتي الـ null مسموح بيها ومش هتعمل Error
    router.replace('/(auth)'); 
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#FFF' }]}>
      <Text style={{ color: isDark ? '#FFF' : '#000', fontSize: 20 }}>
        نوع المستخدم الحالي: {userRole}
      </Text>
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={{ color: '#FFF' }}>تسجيل الخروج</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logoutBtn: { backgroundColor: '#FF5252', padding: 15, borderRadius: 10, marginTop: 20 }
});