import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAppContext } from '../../context/AppContext';

export default function ReportsScreen() {
  const { theme, bookings, lang } = useAppContext();
  const isDark = theme === 'dark';
  const isAr = lang === 'ar';

  // حساب إجمالي الكيلوجرامات بشكل افتراضي (كمثال للإحصائيات)
  const totalWeight = bookings.reduce((sum, item) => sum + parseInt(item.unit), 0);

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#FFF' }]}>
      
      <Text style={[styles.title, { color: isDark ? '#FFF' : '#333' }]}>
        {isAr ? 'إحصائياتك' : 'Your Stats'}
      </Text>

      <View style={styles.statsGrid}>
        
        {/* كارت عدد الطلبات */}
        <View style={[styles.miniCard, { backgroundColor: isDark ? '#1E1E1E' : '#F0F9F8' }]}>
          <Text style={styles.statNum}>{bookings.length}</Text>
          <Text style={styles.statLabel}>{isAr ? 'طلبات منفذة' : 'Orders'}</Text>
        </View>

        {/* كارت إجمالي الوزن */}
        <View style={[styles.miniCard, { backgroundColor: isDark ? '#1E1E1E' : '#F0F9F8' }]}>
          <Text style={styles.statNum}>{totalWeight}</Text>
          <Text style={styles.statLabel}>{isAr ? 'كجم تم بيعه' : 'Kg Sold'}</Text>
        </View>

      </View>

      {/* كارت التوفير البيئي (كشكل إحصائي) */}
      <View style={styles.ecoCard}>
        <Text style={styles.ecoTitle}>{isAr ? 'تأثيرك البيئي 🌿' : 'Eco Impact 🌿'}</Text>
        <Text style={styles.ecoText}>
          {isAr 
            ? 'لقد ساهمت في تقليل انبعاثات الكربون من خلال إعادة التدوير!' 
            : 'You helped reduce carbon emissions by recycling!'}
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  miniCard: { width: '47%', padding: 20, borderRadius: 20, alignItems: 'center', elevation: 2 },
  statNum: { fontSize: 28, fontWeight: 'bold', color: '#009688' },
  statLabel: { fontSize: 14, color: '#888', marginTop: 5 },
  ecoCard: { backgroundColor: '#009688', padding: 25, borderRadius: 25, marginTop: 10 },
  ecoTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  ecoText: { color: '#E0F2F1', fontSize: 14, lineHeight: 20 }
});