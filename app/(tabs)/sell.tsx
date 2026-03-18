import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../../context/AppContext';

export default function SellScreen() {
  const { getCategories, isDark, t } = useAppContext();
  const categories = getCategories();

  const renderItem = ({ item }: any) => (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: isDark ? '#1E1E1E' : '#FFF' }]}
      onPress={() => console.log('Selected:', item.name)}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={item.icon as any} size={32} color="#009688" />
      </View>
      <Text style={[styles.cardTitle, { color: isDark ? '#FFF' : '#333' }]}>{item.name}</Text>
      <Text style={styles.cardUnit}>{t('unit')}: {item.unit}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: isDark ? '#FFF' : '#333' }]}>ماذا تريد أن تبيع اليوم؟</Text>
        <Text style={styles.headerSubtitle}>اختر نوع المخلفات لتقدير السعر والكمية</Text>
      </View>
      
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, marginTop: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  headerSubtitle: { color: '#888', marginTop: 5 },
  listContainer: { padding: 10, paddingBottom: 100 },
  card: {
    flex: 1,
    margin: 8,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0,150,136,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardUnit: { color: '#888', fontSize: 12, marginTop: 5 },
});