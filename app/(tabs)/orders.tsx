import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useAppContext } from '../../context/AppContext';
import { Ionicons } from '@expo/vector-icons';

// بيانات تجريبية (Mock Data) لحد ما نربط بالـ Database
const MOCK_ORDERS = [
  { id: '1', item: 'بلاستيك مختلط', weight: '50 كجم', address: 'السويس، حي الأربعين', price: '500 ج.م', time: 'منذ ساعتين' },
  { id: '2', item: 'كرتون وورق', weight: '120 كجم', address: 'بورفؤاد، منطقة الصفوة', price: '840 ج.م', time: 'منذ 5 ساعات' },
  { id: '3', item: 'نحاس وألومنيوم', weight: '15 كجم', address: 'القاهرة، مدينة نصر', price: '2200 ج.م', time: 'منذ يوم' },
];

export default function OrdersScreen() {
  const { isDark, isAr } = useAppContext();

  const renderOrderItem = ({ item }: { item: typeof MOCK_ORDERS[0] }) => (
    <TouchableOpacity style={[styles.orderCard, { backgroundColor: isDark ? '#1E1E1E' : '#FFF' }]}>
      <View style={styles.orderHeader}>
        <View style={styles.iconBadge}>
          <Ionicons name="cube-outline" size={24} color="#009688" />
        </View>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={[styles.itemTitle, { color: isDark ? '#FFF' : '#333' }]}>{item.item}</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <Text style={styles.priceTag}>{item.price}</Text>
      </View>

      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Ionicons name="scale-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{item.weight}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.detailText} numberOfLines={1}>{item.address}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.acceptBtn}>
        <Text style={styles.acceptBtnText}>قبول الطلب وتواصل مع العميل</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}>
      <View style={styles.topInfo}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#FFF' : '#333' }]}>الطلبات المتاحة بالقرب منك</Text>
        <Ionicons name="filter-outline" size={24} color="#009688" />
      </View>

      <FlatList
        data={MOCK_ORDERS}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listPadding}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  listPadding: { paddingHorizontal: 15, paddingBottom: 20 },
  orderCard: {
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  orderHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  iconBadge: { width: 45, height: 45, borderRadius: 10, backgroundColor: 'rgba(0,150,136,0.1)', justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
  itemTitle: { fontSize: 17, fontWeight: 'bold', textAlign: 'right' },
  timeText: { fontSize: 12, color: '#888', textAlign: 'right' },
  priceTag: { fontSize: 16, fontWeight: 'bold', color: '#009688' },
  detailsRow: { flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 0.5, borderTopColor: '#EEE', paddingTop: 10, marginBottom: 15 },
  detailItem: { flexDirection: 'row', alignItems: 'center' },
  detailText: { fontSize: 13, color: '#666', marginLeft: 5 },
  acceptBtn: { backgroundColor: '#009688', padding: 12, borderRadius: 10, alignItems: 'center' },
  acceptBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 }
});