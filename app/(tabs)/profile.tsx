import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppContext } from '../../context/AppContext';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { t, theme, toggleTheme, toggleLang, lang } = useAppContext();
  const isDark = theme === 'dark';
  const isAr = lang === 'ar';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#FFF' }]}>
      <Text style={[styles.header, { color: isDark ? '#FFF' : '#333', textAlign: isAr ? 'right' : 'left' }]}>
        {t('settings')}
      </Text>

      <TouchableOpacity style={[styles.item, { flexDirection: isAr ? 'row-reverse' : 'row' }]} onPress={toggleLang}>
        <Ionicons name="language" size={24} color="#009688" />
        <Text style={[styles.text, { color: isDark ? '#FFF' : '#333', marginRight: isAr ? 15 : 0, marginLeft: isAr ? 0 : 15 }]}>
          {isAr ? 'تغيير للإنجليزية' : 'Switch to Arabic'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.item, { flexDirection: isAr ? 'row-reverse' : 'row' }]} onPress={toggleTheme}>
        <Ionicons name={isDark ? "sunny" : "moon"} size={24} color="#009688" />
        <Text style={[styles.text, { color: isDark ? '#FFF' : '#333', marginRight: isAr ? 15 : 0, marginLeft: isAr ? 0 : 15 }]}>
          {isDark ? (isAr ? 'الوضع الفاتح' : 'Light Mode') : (isAr ? 'الوضع الداكن' : 'Dark Mode')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 20 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 30 },
  item: { paddingVertical: 20, borderBottomWidth: 0.5, borderBottomColor: '#888', alignItems: 'center' },
  text: { fontSize: 18, fontWeight: '500' }
});