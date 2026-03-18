import React from 'react';
import { StyleSheet, View, Text, Switch, TouchableOpacity } from 'react-native';
import { useAppContext } from '../../context/AppContext';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const { isDark, toggleTheme, lang, toggleLang, t } = useAppContext();

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}>
      <View style={[styles.card, { backgroundColor: isDark ? '#1E1E1E' : '#FFF' }]}>
        <View style={styles.row}>
          <View style={styles.left}>
            <Ionicons name="moon" size={24} color="#009688" />
            <Text style={[styles.text, { color: isDark ? '#FFF' : '#333' }]}>Dark Mode</Text>
          </View>
          <Switch value={isDark} onValueChange={toggleTheme} trackColor={{ true: '#009688' }} />
        </View>

        <TouchableOpacity style={styles.row} onPress={toggleLang}>
          <View style={styles.left}>
            <Ionicons name="language" size={24} color="#009688" />
            <Text style={[styles.text, { color: isDark ? '#FFF' : '#333' }]}>Language / اللغة</Text>
          </View>
          <Text style={{ color: '#009688', fontWeight: 'bold' }}>{lang === 'ar' ? 'العربية' : 'English'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: { borderRadius: 15, padding: 15, elevation: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 0.5, borderBottomColor: '#EEE' },
  left: { flexDirection: 'row', alignItems: 'center' },
  text: { fontSize: 16, marginLeft: 15, fontWeight: '500' }
});